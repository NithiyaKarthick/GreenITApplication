FROM php:8.2.0RC2-apache
RUN apt-get -y update
COPY product-csv.com.conf /etc/apache2/sites-enabled/

#scripts to execute PHP in docker
#docker build -t backend:1.0 .
#docker run -v "$(pwd)/:/var/www/html/product-csv" backend:1.0
#docker exec -it  <container> /bin/bash
#docker start <container>
