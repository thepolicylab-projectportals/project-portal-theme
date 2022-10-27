// Inspired by https://github.com/byebyers/ohmni-gatsby-template/blob/master/src/cms/preview-templates/BlogPostPreview.js

import React from "react"
import PropTypes from "prop-types"

// Components
import { ContactLayout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components/Contact"

const ContactPreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS()

  return (
    <>
      <ContactLayout {...data} showEmail={true} image={<></>} />
    </>
  )
}

ContactPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ContactPreview
