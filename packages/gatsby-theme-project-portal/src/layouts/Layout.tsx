import React, { FunctionComponent, ReactNode } from "react"
import { graphql } from "gatsby"
import { ImageDataLike } from "gatsby-plugin-image"
import { PageLayoutNested } from "../components/PageLayoutNested"

export interface LayoutProps {
  path: string
  children: ReactNode
  data?: {
    site?: {
      siteMetadata?: {
        showDevBanner?: boolean
        staticText?: {
          navbar?: {
            pages?: {
              name: string
              link: string
              show: boolean
            }[]
            title?: string
          }
          bottomBanner?: {
            text: string
            link: string
          }
          footer?: {
            copyright?: string
            links?: {
              title: string
              link: string
            }[]
            heading?: {
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
  data,
  children,
}) => {
  return (
    <PageLayoutNested
      children={children}
      devBanner={{ show: data?.site?.siteMetadata?.showDevBanner }}
      navbar={{
        ...data?.site?.siteMetadata?.staticText?.navbar,
        image: data?.navbarLogo,
        activePage: path,
      }}
      bottomBanner={{
        ...data?.site?.siteMetadata?.staticText?.bottomBanner,
        image: data?.bottomBannerLogo,
      }}
      footer={{
        ...data?.site?.siteMetadata?.staticText?.footer,
        image: {
          imageData: data?.footerLogo,
          altText: data?.site?.siteMetadata?.title + " logo",
        },
      }}
    />
  )
}

export const query = graphql`
  fragment LayoutData on Query {
    site {
      siteMetadata {
        showDevBanner
        staticText {
          navbar {
            pages {
              link
              name
              show
            }
            title
          }
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
