"use strict"

require("source-map-support").install()
require("ts-node").register(require("./tsconfig"))

const createPagesModule = require("./src/hooks/createPages")

exports.createPages = createPagesModule.createPages
exports.onCreatePage = createPagesModule.onCreatePage
