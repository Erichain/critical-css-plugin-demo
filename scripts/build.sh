#!/bin/bash
echo "Clearing previous builds and vendor file..."
rm -rf dist*
echo "Building with DllPlugin..."
export NODE_ENV='production'

webpack --progress --config webpack.config.dll.js
webpack --progress --config webpack.config.prod.js
