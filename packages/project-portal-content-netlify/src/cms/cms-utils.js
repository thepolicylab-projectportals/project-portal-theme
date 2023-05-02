if (typeof window !== "undefined") {
  // add admin.css
  const styles =
    "[data-slate-editor] {-webkit-user-modify: read-write !important;" + "}\n"
  const css = document.createElement("style")
  css.type = "text/css"
  if (css.styleSheet) {
    css.styleSheet.cssText = styles
  } else {
    css.appendChild(document.createTextNode(styles))
  }

  document.head.appendChild(css)

  if (process.env.NETLIFY_SITE_URL) {
    window.localStorage.setItem("netlifySiteURL", process.env.NETLIFY_SITE_URL)
  }

  // Log netlifySiteURL if editing on localhost
  if (
    window.location.hostname === "localhost" &&
    window.localStorage.getItem("netlifySiteURL")
  ) {
    console.log(
      `%cnetlifySiteURL: ${window.localStorage.getItem("netlifySiteURL")}`,
      "color: hotpink; font-size: 15px"
    )
  }
}
