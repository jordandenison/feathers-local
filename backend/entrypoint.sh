#! /bin/ash

if [ ! -d "/usr/src/app/node_modules" ]; then
  cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
fi

mkdir -p /usr/src/app/node_modules/.cache && chmod 766 /usr/src/app/node_modules/.cache
exec npm run dev