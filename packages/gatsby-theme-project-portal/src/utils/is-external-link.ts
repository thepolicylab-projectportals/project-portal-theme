// Copied from https://github.com/sindresorhus/is-absolute-url/blob/3ab19cc2e599a03ea691bcb8a4c09fa3ebb5da4f/index.js
// and from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-link/src/is-local-link.js
// const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/
const STANDARD_LOCAL_LINK = /^\/$|^\/.*\/$/
const ABSOLUTE_URL_REGEX = /^([a-zA-Z]+:)?\/\//
const ABSOLUTE_URL_REGEX_WITH_PROTOCOL = /^[a-zA-Z]+:\/\//
const isAbsolute = (path) => ABSOLUTE_URL_REGEX.test(path)

export const isLocalLink = (path: string) => {
  if (typeof path !== `string`) {
    return undefined
  }
  return !isAbsolute(path)
}
