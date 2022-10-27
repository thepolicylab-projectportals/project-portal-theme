import CMS from "netlify-cms-app"
import ContactPreview from "./contact-preview"
import ProjectDetailPreview from "./project-preview"

// The following configuration is merged with the configuration from the site's config.yml file
// (if it exists in the site's directory static/admin/config.yml)
CMS.init({
  config: {
    media_folder: "content/image",
    public_folder: "/image",
    collections: [
      {
        name: "project",
        label: "Projects",
        folder: "content/project",
        extension: "json",
        create: true,
        identifier_field: "title",
        fields: [
          {
            name: "title",
            label: "Short title",
            widget: "string",
          },
          {
            name: "question",
            label: "Question",
            widget: "markdown",
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
            required: false,
            format: "YYYY-MM-DD",
          },
          {
            name: "startDate",
            label: "Start Date",
            widget: "date",
            required: false,
            format: "YYYY-MM-DD",
          },
          {
            name: "endDate",
            label: "End Date",
            widget: "date",
            required: false,
            format: "YYYY-MM-DD",
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
            value_field: "{{slug}}",
            display_fields: ["name"],
          },
          {
            name: "projectTeam",
            label: "Project Team",
            widget: "relation",
            collection: "Contacts",
            search_fields: ["name"],
            value_field: "{{slug}}",
            display_fields: ["name"],
            multiple: true,
            required: false,
          },
          {
            name: "created",
            label: "Created",
            widget: "datetime",
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
        folder: "content/contact",
        create: true,
        extension: "json",
        identifier_field: "name",
        media_folder: "",
        public_folder: "",
        fields: [
          {
            name: "key",
            label: "Key",
            widget: "hidden",
          },
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

CMS.registerEventListener({
  name: "preSave",
  handler: ({ entry }) => {
    return entry.get("data").set("lastModified", new Date().toISOString())
  },
})

CMS.registerPreviewTemplate("contact", ContactPreview)
CMS.registerPreviewTemplate("project", ProjectDetailPreview)
