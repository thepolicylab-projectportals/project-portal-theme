import React from "react"

export const statusOutput = (
  status: string,
  open: any,
  inProgress: any,
  completed: any
): any => (
  <>
    {status === "open"
      ? open
      : status === "in-progress"
      ? inProgress
      : completed}
  </>
)
