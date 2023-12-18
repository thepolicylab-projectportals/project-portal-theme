# Example Site with example content

https://gatsby-theme-project-portal-ex-site.netlify.app/

A usage of
[gatsby-theme-project-portal](https://github.com/thepolicylab-projectportals/project-portal-theme)
that serves as a local development environment designed to facilitate the testing and development of new features for the Project Portal theme. 



## Quick Start Guide

Clone the repository. 
```shell
git clone https://github.com/thepolicylab-projectportals/project-portal-theme.git
```

Make sure you are at the root of the repository and run the following command to install the required dependencies.

```shell
yarn install
```

For rapid development of new components or styling, run the following command.

```shell
yarn workspace example-site develop
```

Afterwards, run the following command to generate a production-ready version of your website. Certain gatsby node APIs only fire during the build process. While `develop` mode is fine for most cases, the final built site might act in a subtly different way. For more details, see https://www.gatsbyjs.com/docs/conceptual/overview-of-the-gatsby-build-process/#differences-between-develop-and-build

```shell
yarn workspace example-site build
```

Once the build process is completed, run the following command to preview the production build locally.
```shell
yarn workspace example-site serve
```


## Accessing Decap CMS

Navigate to [static/admin/config.yml](./static/admin/config.yml) and make the following change locally:

```yaml
local_backend: true
```

In a separate terminal, make sure you have navigated to the `packages/example-site/` sub-directory and spin up the `decap-server` by running the following command.

```shell
npx decap-server
```

Once `decap-server` is running, you can run `yarn develop` and access the CMS at the address shown in the output of `yarn develop`, typically `http://localhost:8000`.

