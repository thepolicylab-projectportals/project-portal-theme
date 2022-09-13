#!/usr/bin/env zsh

source "./test-packaging.sh"

alias test-pack-empty="package-and-install -m pack -i empty"
alias test-pack-template-defaults="package-and-install -m pack -i template -t packages/defaults/"
alias test-pack-template-example="package-and-install -m pack -i template -t packages/example/"

alias test-publish-template-example="package-and-install -m publish -i template -t packages/example/"

alias test-newest-empty="package-and-install -m newest -i empty"
alias test-newest-template-defaults="package-and-install -m newest -i template -t packages/defaults/"
alias test-newest-template-example="package-and-install -m newest -i template -t packages/example/"
