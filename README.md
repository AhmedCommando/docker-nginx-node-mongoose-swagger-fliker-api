
# Rest api built with typescript, express, webpack, pm2, winston logger, flikr, swagger, docker with nging proxy and mongoDb



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
- after generating the certificate please add it to the certs file of nginx and make sure to change the name of the domain across the project (4 places) :
  * package.json
  * base service
  * swagger config
  * docker-compose file
## install
clone the repo and run this commands (feel free to use npm)

```
yarn install
docker-compose up or docker-compose up -d
```

## Testing v1 routes
To run all tests for v1 routes

```
yarn test:dev:v1
```

## Swagger-ui
To access swagger-ui navigate to /api/docs

## Start production mode using load balancer
```
 yarn start:prod
```
and to check all processes, logs and clusters, pm2 provide a really nice dashboard for that
just run this in you cli

```
yarn monitor
```

to check logs

```
 yarn logs
```

finally to stop every thing and clean your everything

```
CTRL+c 'in your cli to stop docker'
yarn stop
```