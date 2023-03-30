import React from "react"
import { Accordion } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components/Accordion"

const twoElems = [
  { title: "Topic A", text: "topic-a" },
  { title: "Topic B", text: "topic-b" },
]
const AccordionTest = () => {
  return (
    <>
      <h2>Various Behaviours of Accordion Component</h2>
      <h3>Accordion with two elements:</h3>
      {twoElems.map(({ title, text }, i) => (
        <Accordion key={"collapsibleList_" + i} title={title} text={text} />
      ))}
      <h3>Accordion with no elements:</h3>
      <Accordion title={"No text elements:"}></Accordion>
      <h3>Has elements, but they are empty:</h3>
      <Accordion title={""} text={""}></Accordion>
      <h3>Accordion with one item:</h3>
      <Accordion
        title={"We only get one question"}
        text={"And we hate answering it."}
      ></Accordion>
    </>
  )
}

export default AccordionTest
