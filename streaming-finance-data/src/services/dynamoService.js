const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const AWS = require('aws-sdk');
const { response } = require("../app");
const dbConfig = require('../config/dbConfig');

async function loadToDynamo(data, interval) {

    AWS.config.update({ region: 'us-east-1' });
    const dynamodb = new DynamoDBClient({
    region: dbConfig.region,
    credentials: {
        accessKeyId: dbConfig.credentials.accessKeyId,
        secretAccessKey: dbConfig.credentials.secretAccessKey,
    },
    });

  const formatItem = (item) => {
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
    if (item && typeof item === "object") {
      return {
        M: Object.fromEntries(
          Object.entries(item).map(([key, value]) => [key, formatItem(value)])
        ),
      };
    }
    return { NULL: true };
  };

  try {
    // Insert the `meta` fields
    const meta = {
      symbol: { S: data.meta.symbol }, // Partition key
      sortKey: { S: "meta" }, // Sort key
      metaData: {M:{
            longName: { S: data.meta.longName },
            shortName: { S: data.meta.shortName },
            chartPreviousClose: { N: data.meta.chartPreviousClose.toString() },
            currency: { S: data.meta.currency },
            fiftyTwoWeekHigh: { N: data.meta.fiftyTwoWeekHigh.toString() },
            fiftyTwoWeekLow: { N: data.meta.fiftyTwoWeekLow.toString() },
            fullExchangeName: { S: data.meta.fullExchangeName },
            regularMarketDayHigh: { N: data.meta.regularMarketDayHigh.toString() },
            regularMarketDayLow: { N: data.meta.regularMarketDayLow.toString() },
            regularMarketTime: { S: data.meta.regularMarketTime },
            regularMarketPrice: { N: data.meta.regularMarketPrice.toString() },
            regularMarketVolume: { N: data.meta.regularMarketVolume.toString() },
        }
      }
    };

    const metaCommand = new PutItemCommand({
      TableName: "StockSim_Historical_Data", 
      Item: meta,
    });
    const reponse = await dynamodb.send(metaCommand);
    // console.log(reponse);
    console.log(typeof(data.quotes[0]));
    // Insert the `quotes` fields
    const formattedData = data.quotes.map((quote) => ({
          M: {
            volume: { N: quote.volume != null ? quote.volume.toString() : "0" }, // Default to "0" if null
            close: { N: quote.close != null ? quote.close.toString() : "0" },   // Default to "0" if null
            date: { S: quote.date || "N/A" }, // Default to "N/A" if date is missing
        },
      }));

    const params = {
        symbol : {S: data.meta.symbol},
        sortKey: {S: interval},
        values: {L: formattedData}
    }
    const quoteCommand = new PutItemCommand({
        TableName: "StockSim_Historical_Data", // Replace with your table name
        Item: params,
      });
      await dynamodb.send(quoteCommand);
      // console.log(`Quote for date ${quote.date} inserted successfully.`);
  } catch (error) {
    log.error("Error inserting data into DynamoDB:", error);
    console.error("Error inserting data into DynamoDB:", error);
  }
}

module.exports = { loadToDynamo };