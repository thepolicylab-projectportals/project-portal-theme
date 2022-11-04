// Inspired by https://github.com/byebyers/ohmni-gatsby-template/blob/master/src/cms/preview-templates/BlogPostPreview.js

import React from "react"
import PropTypes from "prop-types"

// Components
import { ContactLayout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components/Contact"

const ContactPreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS()

  const image = entry.getIn(["data", "image"])
  const imageAsset = getAsset(image)

  return (
    <ContactLayout
      {...data}
      showEmail={true}
      image={<img src={imageAsset.url} alt={data.name} />}
    />
  )
}

ContactPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ContactPreview
