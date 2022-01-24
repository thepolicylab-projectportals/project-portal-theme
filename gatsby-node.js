"use strict"

require("source-map-support").install()
require("ts-node").register({
  compilerOptions: {
    resolveJsonModule: true,
    module: "commonjs",
    target: "es2017",
  },
})

const createPagesModule = require("./src/hooks/createPages")

exports.createPages = createPagesModule.createPages
exports.onCreatePage = createPagesModule.onCreatePage
