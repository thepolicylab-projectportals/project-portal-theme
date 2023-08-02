import React, { FunctionComponent, ReactNode } from "react"
import { graphql } from "gatsby"
import { Footer, BottomBanner, DevelopmentBanner, Navbar } from "../components"
import { IGatsbyImageData, getImage } from "gatsby-plugin-image"

interface LayoutProps {
  path: string
  title: string
  description: string
  children: ReactNode
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    projectPortalConfig: {
      showDevBanner?: boolean
      pages: {
        name: string
        link: string
        show: boolean
      }[]
    }
    navbarLogo?: IGatsbyImageData
  }
}

export const Layout: FunctionComponent<LayoutProps> = ({
  path,
  data: {
    site: {
      siteMetadata: { title: siteTitle },
    },
    projectPortalConfig: { showDevBanner, pages },
    navbarLogo,
  },
  children,
}) => {
  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 flex flex-col min-h-screen">
      {showDevBanner && <DevelopmentBanner />}
      <Navbar
        title={siteTitle}
        image={navbarLogo}
        pages={pages}
        activePage={path}
      />
      <div className="flex-1">{children}</div>
      <BottomBanner />
      <Footer />
    </div>
  )
}

export const query = graphql`
  fragment LayoutData on Query {
    site {
      siteMetadata {
        title
      }
    }
    projectPortalConfig {
      showDevBanner
      pages {
        link
        name
        show
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
  }
`
