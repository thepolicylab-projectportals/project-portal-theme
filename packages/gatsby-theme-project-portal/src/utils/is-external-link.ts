// Inspired by
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-link/src/is-local-link.js
export const STANDARD_LOCAL_LINK = /^\/$|^\/.*\/$/
export const ABSOLUTE_URL_REGEX = /^([a-zA-Z]+:)?\/\//
export const ABSOLUTE_URL_REGEX_WITH_PROTOCOL = /^[a-zA-Z]+:\/\//

export const isLocalLink = (path: string) => {
  if (typeof path !== `string`) {
    return undefined
  }
  return !ABSOLUTE_URL_REGEX.test(path)
}
