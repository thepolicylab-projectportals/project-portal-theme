import type { Meta, StoryObj } from "@storybook/react"
import { MarkdownText } from "./MarkdownText"

const meta: Meta<typeof MarkdownText> = {
  component: MarkdownText,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof MarkdownText>

// TODO: Fix styling of H3 vs H2 – they look the same
let text = `# Lorem Ipsum

Lorem ipsum dolor *sit amet*, [consectetur](#) adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad __minim__ veniam, quis nostrud exercitation ullamco 
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor \`in reprehenderit\` in 
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## At vero (H2)

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium 
voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati 
cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id 
est laborum et dolorum fuga. 

### Et harum (H3)

Et harum quidem rerum facilis est et expedita distinctio. 

### Nam libero (H3)

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id 
quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet 
ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur 
a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis 
doloribus asperiores repellat.
`

export const Primary: Story = {
  args: {
    text: text,
  },
}

export const JustBody: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
}
export const JustH1: Story = {
  args: { text: "# The text" },
}

export const NoText: Story = {
  args: { text: "" },
}
