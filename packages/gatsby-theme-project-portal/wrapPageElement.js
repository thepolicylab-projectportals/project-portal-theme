import React from "react"
import { NewLayout } from "./src/layouts/NewLayout"

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => (
  <NewLayout {...props}>{element}</NewLayout>
)

export default wrapPageElement
