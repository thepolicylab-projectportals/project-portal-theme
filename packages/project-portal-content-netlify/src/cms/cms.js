import CMS from "netlify-cms-app"

// The following configuration is merged with the configuration from the site's config.yml file
// (if it exists in the site's directory static/admin/config.yml)
CMS.init({
  config: {
    media_folder: "content/image",
    public_folder: "/image",
    collections: [
      {
        name: "projects",
        label: "Projects",
        folder: "content/project",
        extension: "json",
        create: true,
        identifier_field: "slug",
        fields: [
          {
            name: "question",
            label: "Question",
            widget: "markdown",
          },
          {
            name: "slug",
            label: "Slug",
          },
          {
            name: "status",
            label: "Status",
            widget: "select",
            options: ["ongoing", "open", "completed"],
          },
          {
            name: "opportunityCloses",
            label: "Opportunity Closes",
            widget: "date",
            default: "",
            required: false,
          },
          {
            name: "startDate",
            label: "Start Date",
            widget: "date",
            default: "",
          },
          {
            name: "endDate",
            label: "End Date",
            widget: "date",
            default: "",
          },
          {
            name: "agency",
            label: "Agency",
            widget: "markdown",
          },
          {
            name: "topics",
            label: "Topics",
            widget: "relation",
            collection: "topics",
            search_fields: ["name"],
            value_field: "name",
            display_fields: ["name"],
            multiple: true,
          },
          {
            name: "summary",
            label: "Summary",
            widget: "markdown",
          },
          {
            name: "deliverable",
            label: "Deliverable",
            widget: "markdown",
            default: "",
          },
          {
            name: "purpose",
            label: "Purpose",
            widget: "markdown",
            default: "",
          },
          {
            name: "expertise",
            label: "Expertise",
            widget: "markdown",
            default: "",
          },
          {
            name: "requirement",
            label: "Requirement",
            widget: "markdown",
            required: false,
          },
          {
            name: "keyDates",
            label: "Key Dates",
            widget: "markdown",
            required: false,
          },
          {
            name: "statusOfData",
            label: "Status Of Data",
            required: false,
            widget: "markdown",
          },
          {
            name: "priorResearch",
            label: "Prior Research",
            required: false,
            widget: "markdown",
          },
          {
            name: "fundingInfo",
            label: "Funding Info",
            required: false,
            widget: "markdown",
          },
          {
            name: "emailContent",
            label: "Email Content",
            widget: "markdown",
            required: false,
          },
          {
            name: "mainContact",
            label: "Main Contact",
            widget: "relation",
            collection: "Contacts",
            search_fields: ["name"],
            value_field: "name",
            display_fields: ["name"],
          },
          {
            name: "projectTeam",
            label: "Project Team",
            widget: "relation",
            collection: "Contacts",
            search_fields: ["name"],
            value_field: "name",
            display_fields: ["name"],
            multiple: true,
            required: false,
          },
          {
            name: "lastModified",
            label: "Last Modified",
            widget: "datetime",
            required: false,
          },
        ],
      },
      {
        name: "Contacts",
        label: "Project Contacts",
        folder: "content/contact",
        create: true,
        extension: "json",
        identifier_field: "name",
        media_folder: "",
        public_folder: "",
        fields: [
          {
            name: "name",
            label: "Name",
          },
          {
            name: "title",
            label: "Title",
            required: false,
          },
          {
            name: "email",
            label: "Email",
            required: false,
          },
          {
            name: "employer",
            label: "Employer",
            required: false,
          },
          {
            name: "image",
            label: "Contact Image",
            widget: "image",
            required: false,
          },
          {
            name: "lastModified",
            label: "Last Modified",
            widget: "datetime",
            required: false,
          },
        ],
      },
      {
        name: "topics",
        label: "Topics",
        folder: "content/topic",
        extension: "json",
        create: true,
        identifier_field: "name",
        fields: [
          {
            name: "name",
            label: "Topic",
          },
        ],
      },
    ],
  },
})