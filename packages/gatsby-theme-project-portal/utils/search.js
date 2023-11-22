const lodash = require("lodash")
const lunr = require("lunr")
function createSearchIndex(searchNodes) {
  // searchNodes = {allProject[], allGeneralPage[], siteUrl}
  let documents = []
  Object.keys(searchNodes).forEach((page) => {
    searchNodes[page].nodes.forEach((node) => {
      let tempNode = structuredClone(node)
      if (page === "allProject") {
        if (!node.slug.includes("/")) {
          tempNode.slug = `project/${node.slug}`
        }
      }
      const newItem = Object.values(tempNode).map((field) => {
        if (lodash.isNull(field)) {
          return null
        }
        // extract this part out, test it with a bunch of object cases
        if (typeof field === "object") {
          return Object.values(field)
            .filter((value) => !lodash.isNull(value))
            .map((value) => {
              if (typeof value === "string") {
                return value
              } else if (value == undefined) {
                // loose assignment for null
                return value
              } else {
                Object.values(value)
                  .filter((k) => !lodash.isNull(k))
                  .join(" ")
              }
            })
            .join(" ")
        } else {
          return field
        }
      })

      Object.keys(tempNode).forEach((page, i) => {
        tempNode[page] = newItem[i]
      })
      documents.push(tempNode)
    })
  })

  // ask lunr to ignore these words within a search
  const newStopWordFilter = lunr.generateStopWordFilter([
    "a",
    "able",
    "across",
    "after",
    "all",
    "almost",
    "also",
    "am",
    "among",
    "an",
    "and",
    "any",
    "are",
    "as",
    "at",
    "be",
    "because",
    "been",
    "but",
    "by",
    "dear",
    "did",
    "do",
    "does",
    "either",
    "else",
    "ever",
    "every",
    "for",
    "from",
    "get",
    "got",
    "had",
    "he",
    "her",
    "hers",
    "him",
    "his",
    "however",
    "i",
    "if",
    "in",
    "into",
    "is",
    "it",
    "its",
    "just",
    "least",
    "let",
    "like",
    "may",
    "me",
    "might",
    "most",
    "must",
    "my",
    "neither",
    "no",
    "nor",
    "not",
    "of",
    "off",
    "often",
    "on",
    "only",
    "or",
    "other",
    "our",
    "own",
    "rather",
    "said",
    "say",
    "says",
    "she",
    "since",
    "so",
    "some",
    "than",
    "that",
    "the",
    "their",
    "them",
    "then",
    "there",
    "these",
    "they",
    "this",
    "tis",
    "to",
    "too",
    "twas",
    "us",
    "was",
    "we",
    "were",
    "while",
    "will",
    "with",
    "yet",
    "you",
    "your",
  ])

  let index = lunr(function () {
    this.ref("slug") // identifier
    // fields to search
    this.field("slug")
    this.field("faq")
    this.field("aims")
    this.field("lede")
    this.field("title")
    this.field("question")
    this.field("status")
    this.field("agency")
    this.field("topics")
    this.field("mainContact")
    this.field("summary")
    this.field("status")
    this.field("purpose")
    this.field("emailContent")
    this.field("projectTeam")
    this.field("expertise")
    this.field("requirement")

    // allow access to the position of the found word in the field
    this.metadataWhitelist = ["position"]

    this.pipeline.after(lunr.stopWordFilter, newStopWordFilter)
    this.pipeline.remove(lunr.stopWordFilter)

    documents.forEach(function (doc) {
      this.add(doc)
    }, this)
  })
  return [index, documents]
}

const searchQuery = `
    query {
      allProject {
        nodes {
          title
          agency
          topics {
            title
          }
          slug
          summary
          statusOfData
          status
          startDate
          requirement
          question
          purpose
          projectTeam {
            name
            employer
          }
          priorResearch
          opportunityCloses
          mainContact {
            name
          }
          fundingInfo
          expertise
          faq {
            text
            title
          }
          deliverable
          emailContent
          endDate
          slug
        }
      }
      allGeneralPage {
        nodes {
          slug
          lede
          faq {
            text
            title
          }
          aims {
            text
            title
          }
          title
        }
      }
    }
  `

module.exports = { createSearchIndex, searchQuery }
