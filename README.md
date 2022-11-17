# myWebPage

## Installation
Software that need to be installed
- nodejs
- docker and docker-compose

Run the following command to install modules of nodejs
```
npm install mysql2 --save
npm install express --save
npm install body-parser --save
npm install helmet --save
npm install express-rate-limit --save
npm install xml2js --save
```

Run the following command to download the mySQL image
```
docker pull mysql/mysql-server
```

Run the following command in the database directory to run mySQL database container
```
make compose
```
