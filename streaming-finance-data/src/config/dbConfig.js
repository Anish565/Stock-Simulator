const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { logger } = require('../utils/logger');

// Define the path to dbConfig.json
const configPath = path.join(__dirname, 'dbConfig.json');

// Default configuration
const defaultConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root@123',
    database: 'Stock_Appl_Simulator',
};

// Function to load configuration or create a default one if missing
function loadOrCreateDbConfig() {
    // Check if dbConfig.json exists
    if (fs.existsSync(configPath)) {
        logger.info(`loadOrCreateDbConfig: Fetching dbConfig from ${configPath}`);
        // Read and parse the existing configuration file
        const configData = fs.readFileSync(configPath, 'utf-8');

        logger.info(`loadOrCreateDbConfig: Fetched dbConfig: ${configData}`);
        return JSON.parse(configData);
    } else {
        // Create dbConfig.json with default values
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
        console.log('dbConfig.json file created with default configuration.');
        return defaultConfig;
    }
}

// Export the configuration so it can be used in other parts of your app
const dbConfig = loadOrCreateDbConfig();

const pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
});

// Test the connection
pool.connect((err) => {
    if (err) {
        logger.error(`Error connecting to PostgreSQL: ${err.message}`);
    } else {
        logger.info('Connected to PostgreSQL');
    }
});

module.exports = pool;
