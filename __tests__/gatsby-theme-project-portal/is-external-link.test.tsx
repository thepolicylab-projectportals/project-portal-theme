import { isLocalLink } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/utils/is-external-link"
test("test typical absolute URLs with scheme", () => {
  expect(isLocalLink("https://example.com")).toBe(false)
  expect(isLocalLink("https://a.b.com")).toBe(false)
  expect(isLocalLink("https://com")).toBe(false)
  expect(isLocalLink("http://google.com")).toBe(false)
  expect(isLocalLink("ftp://google.com")).toBe(false)
})

test("tests absolute URLs without scheme", () => {
  expect(isLocalLink("//example.com")).toBe(false)
  expect(isLocalLink("//a.b.com")).toBe(false)
  expect(isLocalLink("//com")).toBe(false)
})

test("test local links with trailing slashes", () => {
  expect(isLocalLink("/")).toBe(true)
  expect(isLocalLink("open/")).toBe(true)
  expect(isLocalLink("ongoing/")).toBe(true)
  expect(isLocalLink("completed/")).toBe(true)
})
test("test local links with leading and trailing slashes", () => {
  expect(isLocalLink("/open/")).toBe(true)
  expect(isLocalLink("/ongoing/")).toBe(true)
  expect(isLocalLink("/completed/")).toBe(true)
  expect(isLocalLink("/contact//thank-you")).toBe(true)
})
test("test local links with no slashes", () => {
  expect(isLocalLink("open")).toBe(true)
  expect(isLocalLink("ongoing")).toBe(true)
  expect(isLocalLink("completed")).toBe(true)
})

test("test local links with prefixed ./", () => {
  expect(isLocalLink("./open")).toBe(true)
  expect(isLocalLink("./ongoing")).toBe(true)
  expect(isLocalLink("./completed")).toBe(true)
  expect(isLocalLink("./ongoing/")).toBe(true)
  expect(isLocalLink("./completed/")).toBe(true)
  expect(isLocalLink("./contact/thank-you/")).toBe(true)
  expect(isLocalLink("./contact//thank-you")).toBe(true)
})

test("test local links with double slashes embedded", () => {
  expect(isLocalLink("/contact//thank-you")).toBe(true)
  expect(isLocalLink("/contact//thank-you/")).toBe(true)
})

test("test malformed local links with scheme embedded", () => {
  expect(isLocalLink("/contact/https://cats.com")).toBe(true)
})
