module.exports = {
    apps: [
        {
            ...require('./pm2.config'),
            env: {
                "PORT": 3000,
                "NODE_ENV": "development",
                "DB_URL": "mongo",
                "DB_NAME": "awesomeDB",
                "DB_PORT": 27017,
                "API_VERSION": "v1",
                "FLICKR_PUBLIC_URL": "https://api.flickr.com/services/feeds/photos_public.gne?format=json"
            }
        }
    ]
}

