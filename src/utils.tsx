import React from "react"

export const statusOutput = (
  status: string,
  open: any,
  ongoing: any,
  completed: any
): any => (
  <>{status === "open" ? open : status === "ongoing" ? ongoing : completed}</>
)
