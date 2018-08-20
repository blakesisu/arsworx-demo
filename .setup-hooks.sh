#!/bin/bash

if [[ $(find custom-hooks/ -maxdepth 1 -type l -printf '%p -> %l\n') ]]; then
  echo 'Git hooks are linked, run `npm run unlink` to unlink hooks'
else
  echo 'No git hooks linked yet, establish links'
  root=$(git rev-parse --show-toplevel)
  cd $root/.git/hooks
  ln -s ../../.custom-hooks/* . && ls -l
fi

