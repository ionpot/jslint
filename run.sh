#!/bin/sh
DIR="$(dirname "$(readlink -f "$0")")"

node $DIR/run.js "$@"