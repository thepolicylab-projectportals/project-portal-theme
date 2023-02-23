import CMS from "netlify-cms-app"

// The following configuration is merged with the configuration from the site's config.yml file
// (if it exists in the site's directory static/admin/config.yml)
CMS.init({
  config: {
    media_folder: "content/image",
    public_folder: "/image",
    publish_mode: "editorial_workflow",
    collections: [
      {
        name: "project",
        label: "Projects",
        label_singular: "Project",
        folder: "content/project",
        extension: "json",
        create: true,
        identifier_field: "title",
        sortable_fields: ["title", "status", "lastModified"],
        fields: [
          {
            name: "title",
            label: "Short title",
            widget: "string",
            required: true,
            hint:
              'A short phrase or sentence describing the content. Example: "COVID Nonprofit Impact". ' +
              'Slug is created based on the short title."The slug – a part of the web address – is created based on the short title. ' +
              'E.g. https://projectportal.brown.edu/project/covid-nonprofit-impact."',
          },
          {
            name: "question",
            label: "Question",
            widget: "string",
            required: true,
            hint:
              "The main question answered by the project. Research questions should be brief, ideally no more than 25 words." +
              'Example: "What impact has COVID-19 had on nonprofit organizations?"',
          },
          {
            name: "status",
            label: "Status",
            widget: "select",
            options: ["open", "ongoing", "completed"],
            default: "open",
            required: true,
          },
          {
            name: "opportunityCloses",
            label: "Opportunity Closes",
            widget: "date",
            required: false,
            format: "YYYY-MM-DD",
            default: "",
            hint: 'For "open" projects, the date on which the chance to collaborate ceases.',
          },
          {
            name: "startDate",
            label: "Start Date",
            widget: "date",
            required: false,
            format: "YYYY-MM-DD",
            default: "",
            hint:
              "The date on which the project is planned to start / did start. Required for ongoing and completed" +
              " projects, and optional for open projects",
          },
          {
            name: "endDate",
            label: "End Date",
            widget: "date",
            required: false,
            format: "YYYY-MM-DD",
            default: "",
            hint:
              "The date on which the project is planned to end / did end. Required for completed projects, and " +
              "optional for open and ongoing projects.",
          },
          {
            name: "agency",
            label: "Department or Agency",
            widget: "string",
            required: true,
            hint: "The Department or Agency responsible for the project.",
          },
          {
            name: "topics",
            label: "Topics",
            widget: "relation",
            collection: "topic",
            search_fields: ["title"],
            value_field: "{{slug}}",
            display_fields: ["title"],
            multiple: true,
            required: true,
            hint: "A list of themes and topics which relate to this project. To create a new topic, go to the 'Topic' collection.",
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
            required: false,
            hint:
              "(Anticipated) deliverable(s). Required for completed projects, and " +
              "optional for open and ongoing projects.",
          },
          {
            name: "purpose",
            label: "Purpose",
            widget: "markdown",
            default: "",
            required: false,
            hint: "Required for completed projects, and optional for open and ongoing projects.",
          },
          {
            name: "fundingInfo",
            label: "Funding Info",
            widget: "markdown",
            required: false,
          },
          {
            name: "statusOfData",
            label: "Status Of Data",
            widget: "markdown",
            required: false,
          },
          {
            name: "priorResearch",
            label: "Prior Research",
            widget: "markdown",
            required: false,
          },
          {
            name: "mainContact",
            label: "Main Contact",
            widget: "relation",
            collection: "contact",
            search_fields: ["name", "email", "title", "employer"],
            value_field: "{{slug}}",
            display_fields: ["name"],
            required: true,
            hint: 'The primary point of contact. To create a new contact or modify an existing one, go to the "Contacts" collection.',
          },
          {
            name: "emailContent",
            label: "Email Content",
            widget: "markdown",
            required: false,
            hint: 'Shown with Main Contact. Only shown on "open" projects.',
          },
          {
            name: "expertise",
            label: "Expertise",
            widget: "markdown",
            default: "",
            required: false,
            hint: 'Expertise desired from potential collaborators. Only shown on "open" projects.',
          },
          {
            name: "requirement",
            label: "Requirement",
            widget: "markdown",
            required: false,
            hint: 'Requirements for potential collaborators. Only shown on "open" projects.',
          },
          {
            name: "keyDates",
            label: "Key Dates",
            widget: "markdown",
            required: false,
            hint: 'Key dates or events for potential collaborators. Only shown on "open" projects.',
          },
          {
            name: "projectTeam",
            label: "Project Team",
            widget: "relation",
            collection: "contact",
            search_fields: ["name", "email", "title", "employer"],
            value_field: "{{slug}}",
            display_fields: ["name"],
            multiple: true,
            required: false,
            hint: 'People or organizations who are involved. To create a new contact or modify an existing one, go to the "Contacts" collection.',
          },
          {
            name: "created",
            label: "Date Posted",
            widget: "datetime",
            hint: "The default sorting date for open projects. Click now to put this project first.",
          },
          {
            name: "lastModified",
            label: "Last Modified",
            widget: "hidden",
          },
        ],
      },
      {
        name: "contact",
        label: "Contacts",
        label_singular: "Contact",
        folder: "content/contact",
        create: true,
        extension: "json",
        identifier_field: "name",
        media_folder: "",
        public_folder: "",
        sortable_fields: ["name"],
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
            widget: "hidden",
            required: false,
          },
        ],
      },
      {
        name: "topic",
        label: "Topics",
        label_singular: "Topic",
        folder: "content/topic",
        extension: "json",
        create: true,
        sortable_fields: ["title"],
        fields: [
          {
            name: "title",
            label: "Title",
            hint: "Titles should be in Title Case and no more than 30 characters.",
          },
        ],
      },
      {
        name: "cardPage",
        label: "Card Page",
        folder: "content/card-page",
        identifier_field: "shortTitle",
        extension: "json",
        create: true,
        fields: [
          {
            name: "shortTitle",
            label: "Short Title",
            widget: "string",
            required: true,
            hint: "The name which is used to create the web address",
          },
          {
            name: "pageName",
            label: "Page Name",
            widget: "string",
            required: false,
            hint: "The name which appears in the Navbar",
          },
          {
            name: "title",
            label: "Title",
            widget: "string",
            required: false,
            hint: "The title which appears at the top of the page",
          },
          {
            name: "lede",
            label: "Lede",
            widget: "markdown",
            required: false,
            hint: "The text which appears under the title",
          },
          {
            name: "sortOptions",
            label: "Sort Options",
            widget: "select",
            multiple: true,
            required: true,
            options: ["created", "opportunityCloses", "startDate", "endDate"],
            default: ["created"],
          },
          {
            name: "filterOn",
            label: "Filters",
            widget: "object",
            fields: [
              {
                name: "status",
                widget: "select",
                multiple: true,
                required: true,
                options: ["open", "ongoing", "completed"],
                default: ["open", "ongoing", "completed"],
              },
            ],
          },
        ],
      },
    ],
  },
})

CMS.registerEventListener({
  name: "preSave",
  handler: ({ entry }) => {
    return entry.get("data").set("lastModified", new Date().toISOString())
  },
})
