const WebSocket = require('websocket').w3cwebsocket;
const { logger } = require('../utils/logger');
const { loadOrCreateConfig } = require('../utils/configReader');
const protobuf = require('protobufjs');
const path = require('path');

// Load the protobuf schema
const protoPath = path.resolve(__dirname, '../config/yaticker.proto');
const YAHOO_WS_URL = 'wss://streamer.finance.yahoo.com';

// This will hold the decoded protobuf message type
let YatickerMessage;

// Load and parse the protobuf schema
protobuf.load(protoPath, (err, root) => {
    if (err) {
        console.error("Failed to load protobuf schema:", err.message);
        log.error("Failed to load protobuf schema:", err.message);
        return;
    }
    YatickerMessage = root.lookupType('yaticker'); // Adjust based on the message type in your proto file
});


async function streamFinanceData(io) {
    
    function createWebSocketConnection() {
        try {
            // Load configuration
            const config = loadOrCreateConfig();
            const tickers = config.tickers || [];
            
            if (tickers.length === 0) {
                logger.warn('streamFinanceData: No tickers configured. Skipping WebSocket connection.');
                return;
            }
            logger.info(`streamFinanceData: Subscribing to tickers: ${tickers.join(', ')}`);

            // Create WebSocket connection
            const ws = new WebSocket(YAHOO_WS_URL);
            logger.info("streamFinanceData: WebSocket connection opened");

            // Connection established
            ws.onopen = () => {
                try {
                    const subscribeMessage = JSON.stringify({
                        subscribe: tickers
                    });
                    
                    // Send subscription request
                    ws.send(subscribeMessage);
                    logger.info("streamFinanceData: Sent subscription message:", subscribeMessage);
                } catch (subscribeError) {
                    logger.error(`streamFinanceData: Subscription error: ${subscribeError.message}`);
                }
            };

            // Handle incoming messages
            ws.onmessage = async (event) => {
                if (!YatickerMessage) {
                    console.error("streamFinanceData: Protobuf schema not loaded yet.");
                    return;
                }
                try {
                    // Decode the Base64 message and then use protobuf to decode it
                    const decodedBuffer = Buffer.from(event.data, 'base64');
                    
                    const message = YatickerMessage.decode(decodedBuffer);

                    const symbol = message.id;
                    const price = message.price;
                    const timeStamp = message.time;
                    const dayHigh = message.dayHigh;
                    const dayLow = message.dayLow;
                    const dayVolume = message.dayVolume;
                    const changePercent = message.changePercent;
                    const openPrice = message.openPrice;
                    const previousClose = message.previousClose;

                    logger.debug(`streamFinanceData: Raw decoded buffer: ${decodedBuffer.toString('utf-8')}`);

                    // Log the decoded message content

                    // Log the decoded message as JSON
                    logger.info(`Full decoded message: ${JSON.stringify(message, (key, value) =>
                        typeof value === 'bigint' ? value.toString() : value // Convert BigInt to string for JSON compatibility
                    )}`);
                    logger.info(`streamFinanceData: Symbol: ${symbol}, Price: ${price}, Timestamp: ${timeStamp}, Day High: ${dayHigh}, Day Low: ${dayLow}, Volume: ${dayVolume}, ChangePercent: ${changePercent}, openPrice: ${openPrice}, previousClose: ${previousClose}`);

                    
                    // Insert into Dynamo
                    
                    // Broadcast to frontend
                    io.emit('stock-update', {
                        symbol: symbol,
                        price: price,
                        dayHigh: dayHigh,
                        dayLow: dayLow,
                        dayVolume: dayVolume,
                        timestamp: timeStamp,
                        changePercent: changePercent,
                        openPrice: openPrice,
                        previousClose: previousClose
                    });
                    // localhost websocket url
                    logger.info("streamFinanceData: Broadcasted to frontend", "http://localhost:3000");
                    console.log("streamFinanceData: Broadcasted to frontend", "http://localhost:3000");
                } catch (processingError) {
                    logger.error(`streamFinanceData: Message processing error: ${processingError.message}`);
                }
            };

            // Handle connection closure
            ws.onclose = (event) => {
                logger.warn(`streamFinanceData: WebSocket closed. Code: ${event.code}, Reason: ${event.reason || 'No reason provided'}`);
                // Implement exponential backoff for reconnection
                setTimeout(createWebSocketConnection, 5000);
            };

            // Handle WebSocket errors
            ws.onerror = (error) => {
                logger.error(`streamFinanceData: WebSocket error: ${error.message}`);
                ws.close(); // Trigger reconnection
            };

        } catch (setupError) {
            logger.error(`streamFinanceData: WebSocket setup error: ${setupError.message}`);
            // Implement reconnection strategy
            setTimeout(createWebSocketConnection, 5000);
        }
    }

    // Initial connection attempt
    createWebSocketConnection();
}

module.exports = { streamFinanceData };
