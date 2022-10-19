// import { graphql, Link, withPrefix } from "gatsby"
// import React, { FunctionComponent } from "react"
//
// //import{ Layout } from "../layouts/Layout"
//
// import { ProjectDetailLayout } from "../components"
//
// interface ProjectDetailProps {
//   data: {
//     item: {
//       frontmatter: {
//         question: string
//         partnerName: string
//         slug: string
//         summary: string
//         status: string
//         opportunityCloses: Date
//         startDate: Date
//         endDate: Date
//         lastModified: Date
//         agency: string
//         topics: string[]
//         deliverable: string
//         purpose: string
//         expertise: string
//         requirement: string
//         keyDates: string
//         priorResearch: string
//         statusOfData: string
//         fundingInfo: string
//         emailContent: string
//         collaborationType: string
//         contacts: {
//           frontmatter: {
//             name: string
//             title: string
//             employer: string
//             email: string
//             contactImage: any
//           }
//         }[]
//       }
//     }
//   }
//   location: any
// }
//
// export const ProjectDetail: FunctionComponent<ProjectDetailProps> = (props) => {
//   const { data } = props
//   console.log(data)
//   const {
//     question,
//     summary,
//     status,
//     opportunityCloses,
//     startDate,
//     endDate,
//     lastModified,
//     agency,
//     topics,
//     deliverable,
//     purpose,
//     expertise,
//     requirement,
//     keyDates,
//     priorResearch,
//     statusOfData,
//     fundingInfo,
//     contacts,
//     emailContent,
//   } = data.item.frontmatter
//
//   let mainContact = null
//   let projectTeam = null
//
//   if (contacts) {
//     mainContact = contacts[0].frontmatter
//     projectTeam = contacts
//     console.log(projectTeam)
//     // if (!showMainContactOnProjectTeam) {
//     //   projectTeam = contacts.slice(1, contacts.length)
//     // }
//   }
//
//   return (
//     <Layout title={question} description={summary}>
//       <ProjectDetailLayout {...props} />
//     </Layout>
//   )
// }
//
// export const query = graphql`
//   query ProjectDetailQuery($slug: String!) {
//     item: markdownRemark(
//       fileAbsolutePath: { regex: "/projects/" }
//       frontmatter: { slug: { eq: $slug } }
//     ) {
//       frontmatter {
//         question
//         partnerName
//         slug
//         summary
//         status
//         startDate
//         endDate
//         agency
//         topics
//         deliverable
//         purpose
//         opportunityCloses
//         supportNeeded
//         expertise
//         requirement
//         applicationProcess
//         priorResearch
//         fundingInfo
//         emailContent
//         collaborationType
//         contacts {
//           frontmatter {
//             name
//             title
//             employer
//             email
//             contactImage {
//               childImageSharp {
//                 gatsbyImageData(
//                   width: 100
//                   height: 100
//                   placeholder: BLURRED
//                   layout: FIXED
//                 )
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
