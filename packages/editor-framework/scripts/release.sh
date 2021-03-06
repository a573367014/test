#!/bin/bash -e

changelog=node_modules/.bin/changelog

update_version() {
  echo "$(node -p "p=require('./${1}');p.version='${2}';JSON.stringify(p,null,2)")" > $1
  echo "Updated ${1} version to ${2}"
}

current_version=$(node -p "require('./package').version")

printf "Next version (current is $current_version)? "
read next_version

if ! [[ $next_version =~ ^[0-9]\.[0-9]+\.[0-9](-.+)? ]]; then
  echo "Version must be a valid semver string, e.g. 1.0.2 or 2.3.0-beta.1"
  exit 1
fi

npm run lint

update_version 'package.json' $next_version

npm run dist
#npm test

git add -u
git commit -am "release @gaoding/editor-framework@$next_version"
git push

git tag @gaoding/editor-framework@$next_version
git push --tags

#npm publish
