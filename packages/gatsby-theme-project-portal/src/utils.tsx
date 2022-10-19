import { ContactType } from "./components"
export const statusOutput = (
  status: string,
  open: any,
  ongoing: any,
  completed: any
): any =>
  status === "open" ? open : status === "ongoing" ? ongoing : completed

export const isNA = (s: string | ContactType): boolean => !s || s === "\n"
export const isEmpty = (a: string[] | ContactType[]): boolean =>
  a === null || a === undefined || a.length == 0
