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
    /* allow stop words (see https://github.com/olivernn/lunr.js/blob/master/lunr.js)
           we have 'about' as one of the slugs, which spurred this decision
           We can implement our own stopWordFilter:
                    var idx = lunr(function () {
                      // normal index definition
                      this.pipeline.after(lunr.stopWordFilter, myStopWordFilter)
                       this.pipeline.remove(lunr.stopWordFilter)
                    })
        */
    this.pipeline.remove(lunr.stopWordFilter)

    documents.forEach(function (doc) {
      this.add(doc)
    }, this)
  })
  return [index, documents]
}

module.exports = { createSearchIndex }
