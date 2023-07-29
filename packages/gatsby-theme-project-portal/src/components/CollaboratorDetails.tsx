import React from "react"
import { SectionOfItem } from "."
import { isNA } from "../utils"

interface CollaboratorDetailsProps {
  expertise?: string
  requirement?: string
  keyDates?: string
}

export const CollaboratorDetails: React.FC<CollaboratorDetailsProps> = ({
  expertise,
  requirement,
  keyDates,
}) => {
  return (
    <>
      {isNA(expertise) && isNA(requirement) && isNA(keyDates) ? (
        ""
      ) : (
        <>
          <section className="m-responsive">
            <h3 className="text-h3">Application details</h3>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {isNA(expertise) ? (
                ""
              ) : (
                <div className="px-4">
                  <SectionOfItem label="Expertise needed" value={expertise} />
                </div>
              )}
              {isNA(requirement) ? (
                ""
              ) : (
                <div className="px-4">
                  <SectionOfItem
                    label="Requirements and restrictions"
                    value={requirement}
                  />
                </div>
              )}
              {isNA(keyDates) ? (
                ""
              ) : (
                <div className="px-4">
                  <SectionOfItem label="Key dates" value={keyDates} />
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  )
}
