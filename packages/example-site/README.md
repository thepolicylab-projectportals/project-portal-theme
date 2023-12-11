# Example Site with example content

https://gatsby-theme-project-portal-ex-site.netlify.app/

A usage of
[gatsby-theme-project-portal](https://github.com/thepolicylab-projectportals/project-portal-theme)
that serves as a local development environment designed to facilitate the testing and development of new features for the Project Portal theme. 



## Quick Start Guide

Once the repository is cloned, 

Make sure you are at the root of the repository and run the following command to install the required dependencies.

```shell
yarn install
```

Again at the root of the repository, run the following command to generate a built version of your website. Currently, the built version is required to enable the site-wide `Search` feature.
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

Spin up the `decap-server` in a separate terminal by running the following command.

```shell
npx decap-server
```
