FROM mysql:5.7

COPY createTable.sql ~/createTable.sql

RUN mysql -h "localhost" -u "user" "-ppassword" "db" < "~/createTable.sql"