"use strict"

require("source-map-support").install()
require("ts-node").register(require("./tsconfig.json"))

const createPagesModule = require("./src/hooks/createPages")

exports.createPages = createPagesModule.createPages
exports.onCreatePage = createPagesModule.onCreatePage
