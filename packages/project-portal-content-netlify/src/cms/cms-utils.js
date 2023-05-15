if (typeof window !== 'undefined') {

  // add admin.css
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = '/admin/admin.css'
  document.head.appendChild(link)

  if (process.env.NETLIFY_SITE_URL) {
    window.localStorage.setItem(
      'netlifySiteURL', process.env.NETLIFY_SITE_URL
    )
  }

}
