FROM mysql:5.6.50

COPY database.sql /docker-entrypoint-initdb.d
