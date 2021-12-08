# Architecture Description for Project Portal

At a high-level, this is a static site which:

- Hosts content on [Airtable](https://airtable.com),
- Builds using [Gatsby](https://www.gatsbyjs.com),
- Utilizes [Tailwind CSS](https://tailwindcss.com),
- Is hosted on [Netlify](https://www.netlify.com), and
- Collects form information on Netlify and pushes that information back to Airtable.

See the `README` for details on necessary configurations for local builds.

## Airtable

Currently there are three Airtable bases that are used throughout this project. The first
two describe all the content on the site (the projects and all contacts) and third second
tracks all form submissions.

An important fact about each project is that its _slug_ must be unique. This will be
enforced by the Airtable eventually, but it is currently ignored due to development
concerns.

## Gatsby

The basic layout of the site is to provide a series of card-based layouts, one for
each kind of project as described in the Airtable.

Currently there are three types of projects:

- Open (`src/pages/index.tsx`),
- Ongoing (`src/pages/ongoing.tsx`), and
- Completed (`src/pages/completed.tsx`).

The latter two types of projects will only appear on the Navbar if there are actually
any projects of that type.

In each case, these pages are built by the `ProjectPage` (`src/components/ProjectPage.tsx`)
component. This component automatically takes the return from a graphql query which is
filtered by the project type and then displays the projects as cards.

Each individual project detail page is generated in the `gatsby-node.js` file, though
this is just a thin shell around the `createPages` hook `src/hooks/createPages.ts`.
Note that the relevant graphql query is:

```graphql
{
  allAirtable(filter: { table: { eq: "${tableName}" } }) {
    nodes {
      data {
        slug
      }
    }
  }
}
```

In particular, note again that the _slug must be unique_ or else the pages will clobber
each other. Each project detail page is then just a rendering of the `ProjectDetail`
template (`src/templates/ProjectDetail.tsx`).

### Some things to keep in mind

In general, avoid placing images in `static` and instead favor `src/images`. These
images may then be process in a graphql query with sharp for, e.g., cutting down on
size, providing webpack suffices, and so forth.

If the build fails for some reason, there's a high chance it's a gatsby cache problem.
Try running `npm run clean`.

## Tailwind

The vast majority of the CSS is provided in the JSX by Tailwind CSS classes. Primary
color schemes are described in `tailwind.config.js` (though this is a work in progress).

### Some things to keep in mind

`purgecss` will attempt to remove unused CSS classes from the production build. However,
some CSS classes are only used in dynamically generated content, and so `purgecss` may
miss them. If something like this occurs, please utilize the `safelist` in the Tailwind
CSS config.

If you make any changes to the CSS, please make sure to test the site with at least
a narrow media format (e.g., a phone) and a wide media format (e.g., a desktop).

## Netlify

Netlify builds are currently scheduled to trigger:

- Nightly (via Netlify's scheduler) and
- Upon a push to the github repository (via a Github action cURLing a Netlify API).

We are currently investigating how to trigger a build upon certain Airtable actions.

## Forms (Netlify + Zapier + Airtable)

We are using Netlify's built in [Forms](https://docs.netlify.com/forms/setup/?_ga=2.154814840.1787923700.1636648625-1173918369.1635907455)
product. Submissions to these forms are then stored in the Airtable workspace associated
with the project using [Zapier](https://zapier.com/apps/airtable/integrations/netlify).

We note that this Zapier automation piece shouldn't be necessary long term, but it's
cheap for now and reduces engineering effort for v1.
