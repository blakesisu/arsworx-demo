#!/bin/bash

if [[ $(find .git/hooks -maxdepth 1 -type l -printf '%p -> %l\n') ]]; then
  echo 'Unlinking hooks'
  root=$(git rev-parse --show-toplevel)
  cd $root/.git/hooks
  find $root/.git/hooks -maxdepth 1 -type l -exec unlink {} \;
else
  echo 'No git hooks linked yet, run `npm run setlinks` to link hooks'
fi

