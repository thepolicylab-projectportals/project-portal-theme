const lodash = require("lodash")
const lunr = require("lunr")
function createSearchIndex(searchNodes) {
  // searchNodes = {allProject[], allGeneralPage[], siteUrl}
  let documents = []
  Object.keys(searchNodes).forEach((page) => {
    if (page === "siteUrl") {
      return
    } else {
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

          if (typeof field === "object") {
            return Object.values(field)
              .filter((value) => !lodash.isNull(value))
              .map((value) =>
                typeof value === "string"
                  ? value
                  : Object.values(value)
                      .filter((k) => !lodash.isNull(k))
                      .join(" ")
              )
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
    }
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
    "can",
    "cannot",
    "could",
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
    "has",
    "have",
    "he",
    "her",
    "hers",
    "him",
    "his",
    "how",
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
    "likely",
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
    "should",
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
    "wants",
    "was",
    "we",
    "were",
    "what",
    "when",
    "where",
    "which",
    "while",
    "who",
    "whom",
    "why",
    "will",
    "with",
    "would",
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

module.exports = { createSearchIndex }
