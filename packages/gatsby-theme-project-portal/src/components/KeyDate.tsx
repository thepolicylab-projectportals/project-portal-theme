import React, { FunctionComponent } from "react"
import moment from "moment/moment";

interface KeyDateProps {
  status: string
  opportunityCloses?: Date
  startDate?: Date
  endDate?: Date
}

export const KeyDate: FunctionComponent<KeyDateProps> = ({
  status,
  opportunityCloses,
  startDate,
  endDate,

}) => {
    let text
    let date
    if (status === "open") {
        text = "Opportunity closes: "
        if (opportunityCloses) {
            date = moment(opportunityCloses).format("MMMM D, YYYY")
        }
        else { date="Open until filled" }
    } else if (status === "ongoing" && startDate) {
        text = "Project started: "
        date = moment(startDate).format("MMMM D, YYYY")
    } else if  (status === "completed" && endDate) {
        text = "Project ended: "
        date = moment(endDate).format("MMMM D, YYYY")
    }

  return (
    <>
        <span className="font-bold">{text}</span>
        <span>{date}</span>
      </>
  )
}
