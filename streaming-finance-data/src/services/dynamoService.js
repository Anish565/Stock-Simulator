const { DynamoDBClient, PutItemCommand} = require("@aws-sdk/client-dynamodb");
const AWS = require('aws-sdk');

async function loadToDynamo(data) {

    AWS.config.update({ region: 'us-east-1' });

    const dynamodb = new DynamoDBClient({
        region: 'us-east-1',
        credentials: {
            accessKeyId: 'AKIAZI2LHLFXQE4MB2QP',
            secretAccessKey: '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'
        }
    });
    

    const formatItem = (item) => {
        if (typeof item === 'string') {
        return { S: item };
        }
        if (typeof item === 'number') {
        return { N: item.toString() };
        }
        if (typeof item === 'boolean') {
        return { BOOL: item };
        }
        if (item instanceof Date) {
        return { S: item.toISOString() };
        }
        if (Array.isArray(item)) {
        return { L: item.map(formatItem) };
        }
        if (item && typeof item === 'object') {
        return { M: Object.fromEntries(Object.entries(item).map(([key, value]) => [key, formatItem(value)])) };
        }
        return { NULL: true };
    };



    try {
        const meta = formatItem(data.meta);
        const quotes = data.quotes.map((quote) => formatItem(quote));

        const item = {
            TableName: 'StockSim-Historical-Data', // Replace with your table name
            Item: {
            symbol: { S: data.meta.symbol }, // Partition key
            exchangeName: { S: data.meta.exchangeName }, // Sort key
            meta,
            quotes: { L: quotes }
            }
        };

        const command = new PutItemCommand(item);
        const response = await dynamodb.send(command);
        console.log(response);
    }
    catch(error)
    {
        console.log(error)
    }
};
module.exports = { loadToDynamo };

