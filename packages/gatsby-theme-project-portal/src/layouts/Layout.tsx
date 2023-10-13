import React, { FunctionComponent, ReactNode, useState } from "react"
import { graphql } from "gatsby"
import {
  Footer,
  BottomBanner,
  DevelopmentBanner,
  Navbar,
  TopicType,
} from "../components"
import { ImageDataLike } from "gatsby-plugin-image"
import Modal from "react-modal"
Modal.setAppElement(`#___gatsby`)

export interface LayoutProps {
  path: string
  children: ReactNode
  data: {
    site: {
      siteMetadata: {
        title: string
        siteUrl: string
      }
    }
    projectPortalConfig: {
      showDevBanner?: boolean
      pages: {
        name: string
        link: string
        show: boolean
      }[]
      staticText: {
        bottomBanner: {
          text: string
          link: string
        }
        footer: {
          copyright: string
          links: {
            title: string
            link: string
          }[]
          heading: {
            title: string
            link: string
          }
        }
      }
    }
    allProject: {
      nodes: {
        slug
        question
        title
        summary
        status
        opportunityCloses
        startDate
        endDate
        lastModified
        agency
        topics: TopicType[]
        deliverable
        purpose
        expertise
        requirement
        keyDates
        priorResearch
        statusOfData
        fundingInfo
        emailContent
        mainContact: {
          name
          title
          employer
          email
        }
        projectTeam: {
          name
          title
          employer
          email
        }
        faq: {
          text
          title
        }
      }
    }
    allGeneralPage: {
      nodes: {
        slug
        lede
        faq: {
          text
          title
        }
        aims: {
          text
          title
        }
        title
      }
    }
    navbarLogo?: ImageDataLike
    bottomBannerLogo?: ImageDataLike
    footerLogo?: ImageDataLike
  }
}

export const Layout: FunctionComponent<LayoutProps> = ({
  path,
  data: {
    site: {
      siteMetadata: { title: siteTitle, siteUrl },
    },
    projectPortalConfig: {
      showDevBanner,
      pages,
      staticText: { bottomBanner, footer },
    },
    allProject,
    allGeneralPage,
    navbarLogo,
    bottomBannerLogo,
    footerLogo,
  },
  children,
}) => {
  const searchNodes = { siteUrl, allProject, allGeneralPage }
  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 flex flex-col min-h-screen">
      {showDevBanner && <DevelopmentBanner />}
      <Navbar
        title={siteTitle}
        image={navbarLogo}
        pages={pages}
        activePage={path}
        searchNodes={searchNodes}
      />
      <div className="flex-1">{children}</div>
      <BottomBanner
        text={bottomBanner.text}
        link={bottomBanner.link}
        linkId={"bottomBannerLink"}
        image={bottomBannerLogo}
      />
      <Footer
        heading={footer.heading}
        copyright={footer.copyright}
        links={footer.links}
        image={{
          imageData: footerLogo,
          altText: siteTitle + " logo",
        }}
      />
    </div>
  )
}

export const query = graphql`
  fragment LayoutData on Query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    projectPortalConfig {
      showDevBanner
      pages {
        link
        name
        show
      }
      staticText {
        bottomBanner {
          text
          link
        }
        footer {
          copyright
          links {
            title
            link
          }
          heading {
            title
            link
          }
        }
      }
    }
    navbarLogo: file(
      name: { eq: "navbar" }
      extension: { in: ["png", "jpg", "jpeg"] }
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        gatsbyImageData(height: 64)
      }
    }
    bottomBannerLogo: file(
      name: { eq: "bottom-banner" }
      extension: { in: ["png", "jpg", "jpeg"] }
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 160)
      }
    }
    footerLogo: file(
      name: { eq: "footer" }
      extension: { in: ["png", "jpg", "jpeg"] }
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        gatsbyImageData(height: 64)
      }
    }
    allProject {
      nodes {
        slug
        question
        title
        summary
        status
        opportunityCloses
        startDate
        endDate
        lastModified
        agency
        topics {
          ...TopicDetails
        }
        deliverable
        purpose
        expertise
        requirement
        keyDates
        priorResearch
        statusOfData
        fundingInfo
        emailContent
        mainContact {
          name
          title
          employer
          email
        }
        projectTeam {
          name
          title
          employer
          email
        }
        faq {
          text
          title
        }
      }
    }
    allGeneralPage {
      nodes {
        slug
        lede
        faq {
          text
          title
        }
        aims {
          text
          title
        }
        title
      }
    }
  }
`
