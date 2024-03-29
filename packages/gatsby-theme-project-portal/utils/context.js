function getSiteUrl() {
  // Returns a best guess for the current site's URL, given that it might be running on Netlify, GitHub, or locally.
  if (process.env.NETLIFY) {
    // We're running on Netlify
    switch (process.env.CONTEXT) {
      case "production":
        return process.env.URL
      case "deploy-preview":
        return process.env.DEPLOY_PRIME_URL
      case "branch-deploy":
        return process.env.DEPLOY_PRIME_URL
      case "dev":
        // Note: this shouldn't be 8888, which is where the "Netlify server" runs when running Netlify locally.
        return `http://localhost:${process.env.PORT ?? "8000"}`
      default:
        console.error(`context unknown: ${process.env.CONTEXT}`)
        process.exit(1)
    }
  } else if (process.env.CI) {
    // We're running on GitHub
    return `http://localhost:9000`
  } else {
    // We're probably running locally.
    // The user might have set a port, which we'll respect, but if not, we need a sensible default.
    let defaultPort
    switch (process.env.NODE_ENV) {
      case "production":
        defaultPort = 9000
        break
      case "test":
        defaultPort = 3000
        break
      case "development":
        defaultPort = 8000
        break
      default:
        console.error(`NODE_ENV value unknown: ${process.env.NODE_ENV}`)
        process.exit(1)
    }
    return `http://localhost:${process.env.PORT ?? defaultPort}`
  }
}

function getBuildContext() {
  // Returns the build context from wherever we are.
  // For Netlify, returns a string like
  // - "production",
  // - "deploy-preview",
  // - "branch-deploy",
  // - "dev"
  // For elsewhere, returns a string like
  // - "production"
  // - "test"
  // - "development"
  return (
    (process.env.NETLIFY && process.env.CONTEXT) ??
    // If we're running locally, then use the GATSBY_ENV variable
    process.env.GATSBY_ENV ??
    // ... and if that's not set, use NODE_ENV as a fallback.
    process.env.NODE_ENV
  )
}

module.exports = {
  getSiteUrl,
  getBuildContext,
}
