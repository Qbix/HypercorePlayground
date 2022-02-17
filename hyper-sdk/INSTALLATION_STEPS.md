// check node version
node -v
v12.22.10

// check npm version
npm -v
6.14.16

// clone repo
git clone git@github.com:RangerMauve/hyperswarm-web.git
cd hyperswarm-web
npm install

// run
node bin.js

// install http-server
npm install http-server -g

cd hyper-sdk
// serve current directory on a port
http-server -p 8085 -a localhost

// visit the url and see console log in the developer tool
// open this url in 2 or 3 browser windows eg normal, incognito, firefox etc
http://localhost:8085/test3.html
