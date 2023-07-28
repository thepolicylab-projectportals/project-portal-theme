import React, { FunctionComponent, ReactNode } from "react"
import {
  DevelopmentBanner,
  SiteMetadata,
  NavbarLayout,
  FooterLayout,
  BottomBannerLayout,
} from "../components"
import { graphql } from "gatsby"

interface NewLayoutProps {
  projectPortalConfig: {
    showDevBanner?: boolean
    pages: {
      link: string
      name: string
      show: boolean
    }[]
    staticText: {
      bottom_banner: {
        text: string
        link: string
      }
    }
  }

  activePage?: string
  title: string
  description: string
  children: ReactNode
}

export const NewLayout: FunctionComponent<NewLayoutProps> = ({
  projectPortalConfig: {
    showDevBanner,
    pages,
    staticText: { bottom_banner },
  },
  activePage,
  title,
  description,
  children,
}) => {
  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 flex flex-col min-h-screen">
      {showDevBanner && <DevelopmentBanner />}
      {/*<SiteMetadata title={title} description={description} />*/}
      <NavbarLayout activePage={activePage} title={title} pages={pages} />
      <div className="flex-1">{children}</div>
      <BottomBannerLayout
        text={bottom_banner.text}
        link={bottom_banner.link}
        linkId={"bottomBannerLink"}
      />
      {/*<FooterLayout*/}
      {/*  heading={staticText.footer.heading}*/}
      {/*  copyright={staticText.footer.copyright}*/}
      {/*  links={staticText.footer.links}*/}
      {/*/>*/}
    </div>
  )
}

export const query = graphql`
  fragment LayoutQuery on ProjectPortalConfig {
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
`
