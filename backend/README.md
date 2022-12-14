# GreenIT Application - PHP Web API

## Installation

### Using XAMPP to install and run a PHP Application

 1. Install XAMPP to C:\xampp  - XAMPP can be easily installed using the link below.
 https://www.apachefriends.org/download.html

 2. Start the Apache Server in the XAMPP Control Panel

 3. Paste/clone the PHP app to “htdocs” directory. Default htdocs directory location is C:\xampp\htdocs

 4. To create virtual host 

    - Goto C:\xampp\apache\conf\extra, Open httpd-vhosts.conf

    - Add the following virtual host entry
        
        <VirtualHost *:80>
        DocumentRoot C:/xampp/htdocs/product-csv/server/index.php
        ServerName product-csv.com
        </VirtualHost>

    - Add Host Entry in windows by following the steps below

        i) Browse to c:\Windows\System32\drivers\etc
        ii) Open the hosts file and add the below 
            127.0.0.1       product-csv.com
    
  5. Open the browser and enter http://product-csv.com/Order/getOrderDetails to check if the application is running   

## Testing PHP source code

 1. Install a Composer to your project's root
 2. Run composer require codeception/codeception --dev
 3. From now on Codeception (with installed PHPUnit) can be run as: php vendor/bin/codecept
 4. Initialize your testing environment with php vendor/bin/codecept bootstrap
 5. Run  composer require codeception/module-test  --dev     
    composer require codeception/MODULE-ASSERTS  --dev    
 6. Build Unit Test using php vendor/bin/codecept build 
 7. Run using php vendor/bin/codecept run --steps  

 
## Deploy in Docker

### scripts to execute PHP in docker
1. docker build -t backend:1.0 .
2. docker run -v "$(pwd)/:/var/www/html/product-csv" backend:1.0
3. docker exec -it  <container> /bin/bash
4. docker start <container>
