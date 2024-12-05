const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');

const configPath = path.join(__dirname, '../config/appConfig.json');

// Default configuration settings
const defaultConfig = {
    "tickers": ["AAPL", "MSFT", "GOOGL"],
    "historicalData": {
        "startDate": "2023-01-01",
        "endDate": "2023-12-31"
    }
};

// Function to load or create the config file
function loadOrCreateConfig() {
    try {
        if (!fs.existsSync(configPath)) {
            logger.info(`Created appConfig.json with initial configuration at ${configPath}`);
            logger.info(`Default configuration is ${JSON.stringify(defaultConfig)}`)
            
            // If config file does not exist, create it with default values
            fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 4));
            
            logger.info("Created default appConfig.json with initial configuration");
       
        } else {
            logger.info("Loaded existing appConfig.json configuration");
        }
            
        // Load and parse the config file
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        return config;
    } catch (error) {
        // Log error if there’s an issue with file reading or writing
        logger.error(`Error loading or creating appConfig.json: ${error.message}`);
        throw error; // Re-throw error to ensure application knows something went wrong
    }

}

module.exports = { loadOrCreateConfig };
