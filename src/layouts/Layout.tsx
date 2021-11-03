import React, { FunctionComponent, ReactNode } from "react"
import "typeface-roboto"
import "../styles/style.css"

import { LayoutFull } from "./LayoutFull"

interface LayoutProps {
  navigation?: any
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({
  children,
  navigation,
}: LayoutProps) => {
  return <LayoutFull>{children}</LayoutFull>
}
