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
            format: "json"
        };
        fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 4));
        return defaultConfig;
    }
    return JSON.parse(fs.readFileSync(configFilePath, "utf-8"));    
}

const config = loadOrCreateConfig();

const logger = winston.createLogger({
    level: config.level,
    format: config.format === 'json' ? winston.format.json() : winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: config.file })
    ],
});

function initializeLogger() {
    global.logger = logger;
    console.log("Logger initialized with configuration:", config);
}

module.exports = { logger, initializeLogger };