const neo4j = require('neo4j-driver').v1;
const config = require('./env/env');

const driver = neo4j.driver('bolt://' + config.env.dbNeo4jHost + ':' + config.env.dbNeo4jPort, neo4j.auth.basic(config.env.dbNeo4jUser, config.env.dbNeo4jPassword));
const session = driver.session();

module.exports = session;