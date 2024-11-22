// logging utility
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const configFilePath = path.join(__dirname, '../config/logConfig.json');

function loadOrCreateConfig() {
    if (!fs.existsSync(configFilePath)) {
        const defaultConfig = {
            level: "info",
            file: "logs/app.log",
            format: "json" // depreceated
        };
        fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 4));
        return defaultConfig;
    }
    return JSON.parse(fs.readFileSync(configFilePath, "utf-8"));    
}

const config = loadOrCreateConfig();

// Ensure log directory exists
const logDir = path.dirname(config.file);
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Create logger
const logger = winston.createLogger({
    level: config.level,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`) // Place timestamp at the start
    ),
    transports: [
        new winston.transports.File({ filename: config.file }),
        new winston.transports.Console({ format: winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`) }) // Also log to console with the same format
    ],
});

function initializeLogger() {
    global.logger = logger;
    logger.info(`Logger initialized with configuration: \n ${JSON.stringify(config, null, 4)}`);
    console.log(`Logger initialized with configuration: \n ${JSON.stringify(config, null, 4)}`);
}

module.exports = { logger, initializeLogger };