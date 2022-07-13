"use strict"

require("source-map-support").install()

const createPagesModule = require("./src/hooks/createPages")

exports.createPages = createPagesModule.createPages
exports.onCreatePage = createPagesModule.onCreatePage
