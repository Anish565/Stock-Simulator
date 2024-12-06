const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const AWS = require('aws-sdk');

async function polygonDynamoService(data_tickers) {

    AWS.config.update({ region: 'us-east-1' });
    const dynamodb = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIAZI2LHLFXQE4MB2QP",
        secretAccessKey: "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",
    },
    });

    const formatItem = (item) => {
        if (item === undefined || item === null) {
            return { NULL: true };
        }
        if (typeof item === "string") {
            return { S: item };
        }
        if (typeof item === "number") {
            return { N: item.toString() };
        }
        if (typeof item === "boolean") {
            return { BOOL: item };
        }
        if (item instanceof Date) {
            return { S: item.toISOString() };
        }
        if (Array.isArray(item)) {
            return { L: item.map(formatItem) };
        }
        if (typeof item === "object") {
            return {
                M: Object.fromEntries(
                    Object.entries(item)
                        .filter(([key, value]) => value !== undefined && value !== null) // Skip undefined/null fields
                        .map(([key, value]) => [key, formatItem(value)])
                ),
            };
        }
        return { NULL: true };
    };
    
    let rank = 1;
    // console.log(data_tickers);
    for( const data of data_tickers.results) {
        const s = data.ticker;
        // console.log(data);
            try {
                // Insert the `meta` fields
                const insights = data.insights ? formatItem(data.insights) : { NULL: true };
                const tickers = data.tickers ? formatItem(data.tickers) : { NULL: true };
                const params = {
                rank: { S: rank.toString() },
                news: { M:{
                        title: { S: data.title },
                        published_utc: { S: data.published_utc },
                        article_url: { S: data.article_url },
                        tickers,
                        image_url: { S: data.image_url },
                        insights,
                        }
                    }
                };
                const metaCommand = new PutItemCommand({
                  TableName: "Stock_Sim_News_Data", 
                  Item: params,
                });
                console.log(metaCommand);
                const reponse = await dynamodb.send(metaCommand);
                console.log(reponse);
                rank++;
            } catch (error) {
                console.error("Error inserting data into DynamoDB:", error);
            }
    }
}
module.exports = { polygonDynamoService };