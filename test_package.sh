#!/bin/zsh

testDir="./testDir"
siteDir="./project-portal-example"
themeDir="./project-portal-theme"

echo "Delete the old site"
# The rm command takes a little while so
# to speed things up we move the directory first:
mv $testDir .$testDir-delete
# ... and then delete it in the background.
(rm -rf .$testDir-delete) &

echo "Initialize the new site"
rsync -av --progress $siteDir/. $testDir --exclude node_modules --exclude .cache --exclude public

echo "Package the theme"
packName=$(cd $themeDir && yarn pack)
echo "Theme name is: $packName"

echo "Install the theme and then everything else"
(cd $testDir && yarn add "file:../$themeDir/$packName" && yarn install && yarn build && yarn serve --port=8111)
