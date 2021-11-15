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
          <section className="px-4 lg:px-12">
            <div className="w-full pb-2 text-xl font-bold lg:text-2xl">
              <h2>Collaborator details</h2>
            </div>
            <div className="flex flex-wrap">
              {isNA(expertise) ? (
                ""
              ) : (
                <div className="w-full px-4 lg:w-1/3">
                  <SectionOfItem label="Expertise needed" value={expertise} />
                </div>
              )}
              {isNA(requirement) ? (
                ""
              ) : (
                <div className="w-full px-4 lg:w-1/3">
                  <SectionOfItem
                    label="Requirements and restrictions"
                    value={requirement}
                  />
                </div>
              )}
              {isNA(keyDates) ? (
                ""
              ) : (
                <div className="w-full px-4 lg:w-1/3">
                  <SectionOfItem label="Key dates" value={keyDates} />
                </div>
              )}
            </div>
          </section>

          <hr className="mx-4 my-8 text-center border-gray-300 lg:mx-12" />
        </>
      )}

      {isNA(priorResearch) && isNA(statusOfData) && isNA(fundingInfo) ? (
        ""
      ) : (
        <>
          <section className="px-4 lg:px-12">
            <div className="w-full pb-2 text-xl font-bold lg:text-2xl">
              <h2>Project details</h2>
            </div>
            <div className="flex flex-wrap">
              {isNA(statusOfData) ? (
                ""
              ) : (
                <div className="w-full px-4 lg:w-1/3">
                  <SectionOfItem
                    label="Status of associated data"
                    value={statusOfData}
                  />
                </div>
              )}
              {isNA(priorResearch) ? (
                ""
              ) : (
                <div className="w-full px-4 lg:w-1/3">
                  <SectionOfItem
                    label="Prior research and background"
                    value={priorResearch}
                  />
                </div>
              )}
              {isNA(fundingInfo) ? (
                ""
              ) : (
                <div className="w-full px-4 lg:w-1/3">
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
