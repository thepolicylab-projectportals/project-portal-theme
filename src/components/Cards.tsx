import React, { FunctionComponent } from "react"
import { Card, CardProps } from "."

interface CardsProps {
  nodes: {
    data: CardProps
  }[]
}

export const Cards: FunctionComponent<CardsProps> = ({ nodes }) => {
  return (
    <div className="mt-6 lg:mt-10 overflow-hidden px-2 xl:px-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-3 xl:mx-6 gap-4 justify-self-center">
        {nodes.map((item, i) => (
          <Card
            {...item.data}
            navigation={{
              current: i,
              items: nodes.map((item) => `/${item.data.slug}`),
            }}
          />
        ))}
      </div>
    </div>
  )
}
