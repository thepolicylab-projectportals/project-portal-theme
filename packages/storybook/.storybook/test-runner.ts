import type { TestRunnerConfig } from "@storybook/test-runner"
import { getStoryContext } from "@storybook/test-runner"

import { injectAxe, checkA11y, configureAxe } from "axe-playwright"

/*
 * See https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental
 * to learn more about the test-runner hooks API.
 */
const a11yConfig: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page)
  },
  async postVisit(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context)

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    })

    // Skip stories which are disabled
    if (storyContext.parameters?.a11y?.disable) {
      return
    }

    await checkA11y(page, "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    })
  },
}

export default a11yConfig
