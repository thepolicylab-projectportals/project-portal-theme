export const statusOutput = (
  status: string,
  open: any,
  ongoing: any,
  completed: any
): any =>
  status === "open" ? open : status === "ongoing" ? ongoing : completed

export const projectStatus = (
  status: string,
  created: any,
  open: any,
  ongoing: any,
  completed: any
): any =>
  status === "created"
    ? created
    : status === "opportunityCloses"
    ? open
    : status === "startDate"
    ? ongoing
    : completed

export const isNA = (s: string): boolean => !s || s === "\n"
