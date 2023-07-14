import React from "react"
import { KeyDate } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components/KeyDate"

const KeyDateTest = () => {
  return (
    <>
      <h1>Open</h1>
      Shows filler text:<br/>
      <KeyDate status="open" opportunityCloses={""} startDate={""} endDate={""} />
      <hr/>
      Shows date:<br/>
      <KeyDate status="open" opportunityCloses={"2020-10-10"} startDate={""} endDate={""} />
      <hr/>
      Shows date:<br/>
      <KeyDate status="open" opportunityCloses={"2020-10-10"} startDate={"2022-10-10"} endDate={""} />
      <hr/>
      Shows date:<br/>
      <KeyDate status="open" opportunityCloses={"2020-10-10"} startDate={"2022-10-10"} endDate={"2023-10-10"} />
      <hr/>

      <h1>Ongoing</h1>
      Empty:<br/>
      <KeyDate status="ongoing" opportunityCloses={""} startDate={""} endDate={""} />
      <hr/>Empty:<br/>
      <KeyDate status="ongoing" opportunityCloses={"2020-10-10"} startDate={""} endDate={""} />
      <hr/> Shows date:<br/>
      <KeyDate status="ongoing" opportunityCloses={"2020-10-10"} startDate={"2022-10-10"} endDate={""} />
      <hr/> Shows date:<br/>
      <KeyDate status="ongoing" opportunityCloses={"2020-10-10"} startDate={"2022-10-10"} endDate={"2023-10-10"} />
      <hr/> Shows date:<br/>
      <KeyDate status="ongoing" opportunityCloses={""} startDate={"2022-10-10"} endDate={"2023-10-10"} />
      <hr/> Empty:<br/>
      <KeyDate status="ongoing" opportunityCloses={""} startDate={""} endDate={"2023-10-10"} />
      <hr/>

      <h1>Completed</h1>
      <hr/> Empty: <br/>
      <KeyDate status="completed" opportunityCloses={""} startDate={""} endDate={""} />
      <hr/>Empty:<br/>
      <KeyDate status="completed" opportunityCloses={"2020-10-10"} startDate={""} endDate={""} />
      <hr/>Empty:<br/>
      <KeyDate status="completed" opportunityCloses={"2020-10-10"} startDate={"2022-10-10"} endDate={""} />
      <hr/>Shows Date: <br/>
      <KeyDate status="completed" opportunityCloses={"2020-10-10"} startDate={"2022-10-10"} endDate={"2023-10-10"} />
      <hr/>
      Shows Date: <br/>
      <KeyDate status="completed" opportunityCloses={""} startDate={"2022-10-10"} endDate={"2023-10-10"} />
      <hr/>
      Shows Date: <br/>
      <KeyDate status="completed" opportunityCloses={""} startDate={""} endDate={"2023-10-10"} />

    </>
  )
}

export default KeyDateTest
