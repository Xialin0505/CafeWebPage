# myWebPage

## Installation
Software that need to be installed
- nodejs
- docker and docker-compose

Navigate to database folder, run the following command to install modules of nodejs
```
npm install mysql2 --save
```

Navigate to server folder, run the following command to install modules of nodejs
```
npm install express --save
npm install body-parser --save
npm install helmet --save
npm install express-rate-limit --save
npm install xml2js --save
```

Navigate to database folder, run the following command to download the mySQL image
```
docker pull mysql/mysql-server
```

Then run the following command in the database directory to run mySQL database container
```
make compose
```

## Using API testing script
To install `requests` modules, run
```
pip3 install requests
```
## Database
Login to the mysql database using the following credential
```
mysql -h localhost -u user -ppassword db 
```