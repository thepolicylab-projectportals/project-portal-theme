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
      case "development":
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
    // The user might have set a port, but if not, we need a sensible default.
    let defaultPort
    switch (process.env.NODE_ENV) {
      case "development":
        defaultPort = 8000
        break
      case "test":
        defaultPort = 3000
        break
      case "production":
        defaultPort = 9000
        break
      default:
        console.warn(`NODE_ENV value unknown: ${process.env.NODE_ENV}`)
        defaultPort = 8000
    }
    return `http://localhost:${process.env.PORT ?? defaultPort}`
  }
}

module.exports = {
  getSiteUrl,
}
