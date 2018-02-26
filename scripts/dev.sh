#!/bin/bash
export LOCAL_ADDRESS='localhost'
export NODE_ENV='development'

echo "Generating development files..."
webpack-dev-server --progress --config webpack.config.js --watch
