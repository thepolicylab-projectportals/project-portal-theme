import React, { FunctionComponent, ReactNode } from "react"
import { graphql } from "gatsby"
import { Footer, BottomBanner, DevelopmentBanner, Navbar } from "../components"
import { ImageDataLike } from "gatsby-plugin-image"

export interface LayoutProps {
  path: string
  children: ReactNode
  data: {
    site: {
      siteMetadata: {
        title: string
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
      siteMetadata: {
        title: siteTitle,
        showDevBanner,
        pages,
        staticText: { bottomBanner, footer },
      },
    },
    navbarLogo,
    bottomBannerLogo,
    footerLogo,
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
  }
`
