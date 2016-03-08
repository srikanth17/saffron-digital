# Github
https://github.com/srikanth17/saffron-digital

# Downloading Apache
For setting up Apache, please follow the instructions from the link below.

http://httpd.apache.org/docs/current/platform/

Popular options for deploying Apache httpd
Wamp Server (windows only) - http://www.wampserver.com
XAMPP (Windows, Linux, OS X) - https://www.apachefriends.org/index.html

# Starting Apache 
Two ways to run Apache
1. Running Apache as a Service 
http://httpd.apache.org/docs/current/platform/windows.html
The above link explains how to set up this as a Service.

2. Running Apache as a Console Application
http://httpd.apache.org/docs/current/platform/windows.html
The above link explains how to set up this as a console Application.

The apache server can be started with the command "apache start" after setting up using one of the above 2 ways.

# Testing the Installation
After Starting, the default listening port will be 80. To connect to the server and access the default page, launch a browser and enter this URL:

http://localhost/ or http://127.0.0.1/

Apache should respond with a welcome page and you should see "It Works!".

# Running Application
Place the downloaded folder (saffron-digital-master) inside the Apache Sites folder. Move to the corresponding URL on the web browser.

http://localhost/saffron-digital-master/ or http://127.0.0.1/saffron-digital-master/

Open the index.html file to see the application running. 