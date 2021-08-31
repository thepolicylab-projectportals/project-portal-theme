import React, { FunctionComponent, ReactNode } from "react"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing"
import "typeface-roboto"
import "../styles/style.css"

import { LayoutFull } from "./LayoutFull"
import { LayoutModal } from "./LayoutModal"

interface LayoutProps {
  navigation?: any
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({
  children,
  navigation,
}: LayoutProps) => {
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) =>
        modal ? (
          <LayoutModal closeTo={closeTo} navigation={navigation}>
            {children}
          </LayoutModal>
        ) : (
          <LayoutFull>{children}</LayoutFull>
        )
      }
    </ModalRoutingContext.Consumer>
  )
}
