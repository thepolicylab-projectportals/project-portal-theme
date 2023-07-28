import React, { FunctionComponent, ReactNode } from "react"
import {
  DevelopmentBanner,
  NavbarLayout,
  FooterLayout,
  FooterProps,
  BottomBannerLayout,
  BottomBannerProps,
} from "../components"
import { graphql } from "gatsby"
import { getImage, IGatsbyImageData } from "gatsby-plugin-image"

interface LayoutProps {
  path: string
  data: {
    projectPortalConfig: {
      showDevBanner?: boolean
      pages: {
        link: string
        name: string
        show: boolean
      }[]
      staticText: {
        bottom_banner: BottomBannerProps
        footer: FooterProps
      }
    }
    site: { siteMetadata: { title: string } }
    navbarLogo?: IGatsbyImageData
    footerLogo?: IGatsbyImageData
  }

  activePage?: string
  title: string
  description: string
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({
  data: {
    projectPortalConfig: {
      showDevBanner,
      pages,
      staticText: { bottom_banner, footer },
    },
    site: {
      siteMetadata: { title },
    },
    navbarLogo,
    footerLogo,
  },
  path,
  children,
}) => {
  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 flex flex-col min-h-screen">
      {showDevBanner && <DevelopmentBanner />}
      <NavbarLayout
        activePage={path}
        title={title}
        pages={pages}
        image={navbarLogo ? getImage(navbarLogo) : null}
      />
      <div className="flex-1">{children}</div>
      <BottomBannerLayout
        text={bottom_banner.text}
        link={bottom_banner.link}
        linkId={"bottomBannerLink"}
      />
      <FooterLayout
        heading={footer.heading}
        copyright={footer.copyright}
        links={footer.links}
        image={{
          imageData: footerLogo ? getImage(footerLogo) : null,
          altText: title + " logo",
        }}
      />
    </div>
  )
}

export const query = graphql`
  fragment LayoutQuery on Query {
    navbarLogo: file(
      name: { eq: "navbar" }
      extension: { in: ["png", "jpg", "jpeg"] }
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        gatsbyImageData(height: 64)
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
    site {
      ...HeadData
    }
    projectPortalConfig {
      showDevBanner
      pages {
        link
        name
        show
      }
      staticText {
        bottom_banner {
          text
          link
        }
        footer {
          copyright
          heading {
            link
            title
          }
          links {
            link
            title
          }
        }
      }
    }
  }
`
