#!/bin/sh
mkdir -p /usr/src/movasagh-customer/static
cp -r /usr/src/movasagh-customer/dist/* /usr/src/movasagh-customer/static/
exec "$@"
