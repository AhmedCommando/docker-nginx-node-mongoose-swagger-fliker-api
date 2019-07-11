
# Rest api built with typescript, express, webpack, pm2, winston logger, tsoa, swagger, docker with nging proxy and mongoDb

## install
clone the repo and run this commands (feel free to use npm)

```
yarn install
yarn tsoa:gen
docker-compose up or docker-compose up -d
```

## Custom url and certif for https
- add you custom local url to all the places with develop.home.com
- use a global dns if you have your own domain by redirect to your localhost 127.0.0.1 or 
```
sudo nano /etc/hosts
add in the end of file 127.0.0.1 subdomain.yourdomain.com or domain.com like dev.local
```
- generate certif in ngnix container by running
```
create-ssl-certificate --hostname youDomain --domain com
```
