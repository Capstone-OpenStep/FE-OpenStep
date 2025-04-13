#!/bin/sh
set -e

if [ ! -f package.json ]; then
  npm create vite@latest my-react-app -- --template react
fi

npm install

exec npm run dev
