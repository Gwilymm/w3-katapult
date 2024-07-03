#!/bin/bash


# Navigate to /front and run npm build
cd front/

npm run build
# Navigate to /back and run the app
cd ../back
node app.js