const env = {
    webPort: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || 'localhost:3000',
    dbPort: process.env.DB_PORT || '',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || 'proj-ind',
    allowOrigin: process.env.ALLOW_ORIGIN || '*',
    env: process.env.ENV || 'development',
    appUsername: process.env.APP_USERNAME || 'username',
    appPassword: process.env.APP_PASSWORD || 'test',
    secretKey: process.env.SECRET_KEY || 'W4nG7UKHn7xgctmb'
};

const dburl = process.env.NODE_ENV === 'production' ?
    'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    'mongodb://localhost/' + env.dbDatabase;

module.exports = {
    env: env,
    dburl: dburl
};