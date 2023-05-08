if (typeof window !== "undefined") {
  // add styles to header of the cms page
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>[data-slate-editor] {
    -webkit-user-modify: read-write !important;
    }</style>`
  )

  if (process.env.NETLIFY_SITE_URL) {
    window.localStorage.setItem("netlifySiteURL", process.env.NETLIFY_SITE_URL)
  }
}
