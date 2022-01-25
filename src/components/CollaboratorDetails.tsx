import React from "react"
import { SectionOfItem } from "../components"

const isNA = (s: string): boolean => !s || s === "\n"

interface CollaboratorDetailsProps {
  expertise?: string
  requirement?: string
  keyDates?: string
  priorResearch?: string
  statusOfData?: string
  fundingInfo?: string
}

export const CollaboratorDetails: React.FC<CollaboratorDetailsProps> = ({
  expertise,
  requirement,
  keyDates,
  priorResearch,
  statusOfData,
  fundingInfo,
}) => {
  return (
    <>
      {isNA(expertise) && isNA(requirement) && isNA(keyDates) ? (
        ""
      ) : (
        <>
          <section className="m-responsive">
            <h3>Application details</h3>
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
