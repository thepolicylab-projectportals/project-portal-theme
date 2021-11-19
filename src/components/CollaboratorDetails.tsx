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
            <h3>Collaborator details</h3>
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

          <hr className="my-8 border-gray-300" />
        </>
      )}

      {isNA(priorResearch) && isNA(statusOfData) && isNA(fundingInfo) ? (
        ""
      ) : (
        <>
          <section className="m-responsive">
            <h3>Project details</h3>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {isNA(statusOfData) ? (
                ""
              ) : (
                <div className="px-4">
                  <SectionOfItem
                    label="Status of associated data"
                    value={statusOfData}
                  />
                </div>
              )}
              {isNA(priorResearch) ? (
                ""
              ) : (
                <div className="px-4">
                  <SectionOfItem
                    label="Prior research and background"
                    value={priorResearch}
                  />
                </div>
              )}
              {isNA(fundingInfo) ? (
                ""
              ) : (
                <div className="px-4">
                  <SectionOfItem label="Funding details" value={fundingInfo} />
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  )
}
