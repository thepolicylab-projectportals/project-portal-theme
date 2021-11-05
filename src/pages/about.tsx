import React, {Component, useState} from "react"
import { Link, withPrefix, graphql  } from "gatsby"
import { Navbar, SiteMetadata} from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "../components/HeaderWithImage"


const aboutTextData = [
  {
    title: "Connect government and researchers to improve the lives of San Antonio residents.",
    text: "The San Antonio Research Partnerships Portal is a part of a pilot initiative from The San Antonio Office of Innovation and multiple departments within San Antonio City Government to connect department research needs with San Antonio's rich community of Academic Institutions. We believe that evidence is an important part of improving public services, and we're excited about what can do together."
  },
  {
    title: "Build durable partnerships at all stages of the learning process.",
    text: "We're looking for thought partners, not just evaluators. Project opportunities range from problem framing and introduction to existing reseach to intervention and evaluation design to technical assistance to reporting, and seek expertise from a wide range of academic disciplines. "
  },
  {
    title: "Advance open science tools and methods in applied research.",
    text: "Applied research has the potential to improve not only the program being studied, but public services as a whole. To do this, we need to be transparent with our results and methods. Researchers who collaborate with government partners will be able to publish results."
  }
]

const aboutListData = [
  {
    title: "Will I be able to publish my results?",
    text: "Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here."
  },
  {
    title: "Are these opportunities available for teams?",
    text: "Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here."
  },
  {
    title: "Are these oppotunities available for students?",
    text: "Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here."
  },
  {
    title: "What kind of funding is available?",
    text: "Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here."
  }
]

interface AboutProps {
  data: {
    bgImage: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
}



const CollapsibleList = (collapsibleTitle: string, collapsibleText:string) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="accordian-item"> 
      <div className="accordian-title p-3 bg-gray-300 m-4" onClick = {() => setIsActive(!isActive)}>
        <div className="text-xl font-bold text-black dark:text-white float-left">
          {collapsibleTitle}
        </div>
        <div className="float-right">{isActive ? '-' : '+'}</div>
        <div className="clear-both"></div>
      </div> 
      {isActive && <div className="accordion-content text-md lg:text-lg leading-normal p-3 m-4 text-justify">
        <p>
          {collapsibleText}
        </p>
      </div>}
    </div> 
  )
}


const AboutList = (aboutTitle: string, aboutText: string) =>{
  return(
    <div>
      <h3 className="text-l lg:text-3xl font-bold text-black dark:text-white tracking-tight p-1">
        {aboutTitle}
      </h3>
      <p className="text-md lg:text-lg leading-normal text-justify p-2">
        {aboutText}
      </p>
      <br></br>
    </div>
  )
}


export default ({data}: AboutProps) => {
  return (
    <Layout>
      <SiteMetadata
        title="Project Portal - About"
        description="Questions from East Evidencia"
      />

      <Navbar activePage="about" />

      <HeaderWithImage
        title="About"
        lede=""
        imageSrc={data.bgImage.childImageSharp.resize.src}
      />


      <div className="container pt-6 overflow-hidden bg-white px-16">
        <div className="flex flex-wrap">
          <div className="lg:w-2/3 sm:w-full">
            <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight leading-loose lg:text-5xl mb-8">
              San Antonio Research Partnerships Portal Goals
            </h2>
            {aboutTextData.map((list) => AboutList(list.title, list.text))}
          </div>
        </div>
      </div>


      <div className="container pt-6 overflow-hidden bg-white px-16">
        <div className="flex flex-wrap">
          <div className="lg:w-2/3 sm:w-full">
            <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight leading-loose lg:text-5xl mb-8">
              Frequently Asked Questions 
            </h2>
            {aboutListData.map((list) => CollapsibleList(list.title, list.text))}
          </div>
        </div>
      </div>

    </Layout>
  )
}



export const query = graphql`
  query AboutQuery {
    bgImage: file(relativePath: { regex: "/bg-about.png/" }) {
      childImageSharp {
        resize(width: 1536, height: 352) {
          src
        }
      }
    }
  }
`
