#!/bin/zsh

testDir="./testDir"
siteDir="./project-portal-example"
themeDir="./project-portal-theme"

echo "Initialize the new site"
rm -rf $testDir
rsync -av --progress $siteDir/. $testDir --exclude node_modules --exclude .cache --exclude public

echo "Package the theme"
packName=$(cd $themeDir && npm pack)
echo "Theme name is: $packName"

echo "Install the theme and then everything else"
(cd $testDir && npm install "../$themeDir/$packName" && npm install && npm run develop)
