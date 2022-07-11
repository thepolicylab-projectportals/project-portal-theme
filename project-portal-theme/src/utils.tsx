export const statusOutput = (
  status: string,
  open: any,
  ongoing: any,
  completed: any
): any =>
  status === "open" ? open : status === "ongoing" ? ongoing : completed

export const isNA = (s: string): boolean => !s || s === "\n"
export const isEmpty = (a: string[]): boolean => a === null || a === undefined || a.length == 0
