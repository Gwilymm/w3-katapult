#!/bin/bash


# Navigate to /front and run npm build
cd front/
npm install
npm run build
# Navigate to /back and run the app
cd ../back
npm install
node app.js