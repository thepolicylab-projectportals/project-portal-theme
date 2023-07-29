import React from "react"
import { Contact, ContactType } from "."
import { IGatsbyImageData } from "gatsby-plugin-image"

interface ProjectTeamProps {
  title: string
  contacts: ContactType[]
  defaultContactImage: IGatsbyImageData
}

export const ProjectTeam: React.FC<ProjectTeamProps> = ({
  title,
  contacts,
  defaultContactImage,
}) => {
  return (
    <section className="m-responsive">
      <h3 className="text-h3 my-4">{title}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-self-center">
        {contacts.map((contact, i) => (
          <div className="w-auto px-4">
            <Contact
              key={"contact-" + i}
              {...contact}
              showEmail={false}
              image={contact.image ?? defaultContactImage}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
