#!/bin/sh
url=`git ls-remote --get-url`

remote_sha=`git rev-parse origin/develop`
local_sha=`git rev-parse HEAD`
range="$remote_sha..$local_sha"

# all changes
commits=`git log --oneline --pretty=format:"%h %s" "$range"`
# Check for WIP commit
wips=`git rev-list -n 1 --grep '^WIP' "$range"`

root=$(git rev-parse --show-toplevel)
cd $root
repo=$(basename $root)
user=$(git config --global --get user.name)

rev=$(git log -1 --format=format:%h)
ref=$(git rev-parse --abbrev-ref HEAD)
cd - >/dev/null

webhook_url="https://hooks.slack.com/services/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"
chat_url="https://slack.com/api/chat.postMessage"
channel="#pia"
token="B7WA7N24T/dtrwJcGFBNLcokDfa9Ew3WpM"


title="$user pushing to $repo/$ref at $url"
msg=$(echo -e "Commits:\n$commits")

 curl -X POST -H 'Content-type: application/json' \
--data "{\"channel\":\"<CHANNELID>\", \"username\": \"Boilerplate CI\", \"icon_emoji\": \":nerd_face:\", \"text\":\"$title\", \"attachments\": [{\"text\":\"$msg\"}]}" \
$webhook_url
