const fs = require('fs');
const path = require('path');

// Define the path to dbConfig.json
const configPath = path.join(__dirname, 'dbConfig.json');

// Default configuration
const defaultConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'my_database',
};

// Function to load configuration or create a default one if missing
function loadOrCreateDbConfig() {
    // Check if dbConfig.json exists
    if (fs.existsSync(configPath)) {
        // Read and parse the existing configuration file
        const configData = fs.readFileSync(configPath, 'utf-8');
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
module.exports = dbConfig;
