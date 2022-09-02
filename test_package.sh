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
packOutput=$(cd $themeDir && yarn pack)
packName=$( echo $packOutput | grep "Wrote tarball to" | cut -d " " -f 5 | sed "s/\"//" | sed "s/\"\.//")
echo "Theme name is: $packName"

echo "Install the theme and then everything else"
(
cd $testDir &&
sed -i '' "s+\project-portal-theme\": \"^1.0.0\"+\project-portal-theme\": \"file:${packName}\"+" package.json &&
yarn install &&
yarn build &&
yarn serve --port=8111
)
