import argparse
import logging
import os
import pathlib
from collections import OrderedDict
from functools import singledispatch

from airtable import airtable

_logger = logging.getLogger(__name__)


def main():
    parser = argparse.ArgumentParser(description='export the airtable data to markdown')
    parser.add_argument('--base-id', type=str, default=os.environ.get("AIRTABLE_BASE_ID"),
                        help="Airtable Base ID. "
                             "If unset, is read from the environment variable `AIRTABLE_BASE_ID`")
    parser.add_argument('--api-key', type=str, default=os.environ.get("AIRTABLE_API_KEY"),
                        help="Airtable API key. "
                             "If unset, is read from the environment variable `AIRTABLE_API_KEY`")
    parser.add_argument('--out-dir', '--output-directory', type=pathlib.Path,
                        default=pathlib.Path(),
                        help="directory for output files")
    parser.add_argument('--filter-expression', type=str, default=None,
                        help="filter used to select or exclude records, "
                             "e.g. \"partnerName='North Carolina'\""
                        )

    args = parser.parse_args()
    at = airtable.Airtable(args.base_id, args.api_key)

    project_table_name = "Project%20Page%20Content"
    project_fields_ignore = ["(from contact)", ]

    contact_table_name = "Project%20Contacts"
    contact_fields_ignore = []

    all_projects = at.iterate(project_table_name, filter_by_formula=args.filter_expression)
    all_contacts = tuple(at.iterate(contact_table_name))
    seen_contact_ids = set()

    paths_we_touched = set()

    project_output_directory = pathlib.Path(args.out_dir, "projects")
    project_output_directory.mkdir(parents=True, exist_ok=True)
    paths_we_touched.add(project_output_directory)

    contact_output_directory = pathlib.Path(args.out_dir, "contacts")
    contact_output_directory.mkdir(parents=True, exist_ok=True)
    paths_we_touched.add(contact_output_directory)

    for project in all_projects:
        fields = project["fields"]
        filtered_fields = OrderedDict(id=project["id"])
        filtered_fields.update(
            **{
                key: fields[key] for key in fields if
                not any_matching_strings(key, *project_fields_ignore)
            }
        )
        filename = pathlib.Path(args.out_dir, "projects", f"{project['fields']['slug']}.md")
        write_fields_to_file(filename, filtered_fields)
        [seen_contact_ids.add(c) for c in fields["contacts"]]
        [paths_we_touched.add(filename)]

    for contact in all_contacts:
        if contact["id"] in seen_contact_ids:
            fields = contact["fields"]
            filtered_fields = OrderedDict(**{key: fields[key] for key in fields if
                                             not any_matching_strings(key, *contact_fields_ignore)})
            filename = pathlib.Path(args.out_dir, "contacts", f"{contact['id']}.md")
            write_fields_to_file(filename, filtered_fields)
            [paths_we_touched.add(filename)]

    all_paths_in_ouput_directory = set(args.out_dir.rglob("*"))
    paths_we_didnt_touch = all_paths_in_ouput_directory - paths_we_touched

    if len(paths_we_didnt_touch) > 0:
        print("paths we didn't touch (and may need to be deleted) are:")
        print("\n".join([repr(p) for p in sorted(paths_we_didnt_touch)]))


@singledispatch
def convert_to_one_line(value):
    return value


@convert_to_one_line.register
def _(value: str):
    _logger.debug(f"expecting string: {value}")
    new_value = value.replace("\n", "\\n")
    return new_value


@convert_to_one_line.register
def _(value: list):
    _logger.debug(f"expecting list: {value}")
    new_value = " ".join([convert_to_one_line(subvalue) for subvalue in value])
    return new_value


@convert_to_one_line.register
def _(value: OrderedDict):
    _logger.debug(f"expecting OrderedDict: {value}")
    new_value = repr(value)
    return new_value


def fields_recursively(fields: OrderedDict):
    lines = []
    for field, value in fields.items():
        if "(from contact)" in field:
            continue
        _logger.debug(f"next field: `{field}`, {type(value)}, {value}")
        lines.append(f"{field}: {convert_to_one_line(value)}")
    output = "\n".join(lines)
    return output


def any_matching_strings(value: str, *ignores: str):
    for ignore in ignores:
        if ignore in value:
            _logger.debug(f"'{ignore}' in {value}, skipping")
            return True
    return False


def write_fields_to_file(outpath, filtered_fields):
    outpath.parent.mkdir(parents=True, exist_ok=True)
    with open(outpath, "w") as f:
        f.write(f"---\n{fields_recursively(filtered_fields)}\n---")


if __name__ == "__main__":
    main()
