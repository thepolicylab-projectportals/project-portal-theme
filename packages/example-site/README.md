# Example site with defaults

A usage of
[gatsby-theme-project-portal](https://github.com/thepolicylab-projectportals/project-portal-theme)
that loads the theme and shows the default set of features without changing anything. 



### Running Netlify CMS locally
To run the Netlify CMS interface on a local deployment, there are two things you must configure. 

Inside `.../example-site/static/admin/config.yml`, you must set `local_backend: true`

Also you must run the command `npx netlify-cms-proxy-server` to start the Netlify CMS File System Proxy Server

