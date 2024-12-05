//  Server configuration setup
const fs = require('fs');
const path = require('path');
const configFilePath = path.join(__dirname, 'serverConfig.json');

function loadOrCreateServerConfig() {
    if (!fs.existsSync(configFilePath)) {
        const defaultConfig = {
            port: 3000
        };
        fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 4));
        return defaultConfig;
    }
    return JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
}

module.exports = loadOrCreateServerConfig();
