// Define database schema and queries
const historicalStockTable = `
    CREATE TABLE IF NOT EXISTS historical_stock_data (
        id SERIAL PRIMARY KEY,
        ticker VARCHAR(10) NOT NULL,
        date DATE NOT NULL,
        open_price DECIMAL(10, 2),
        high_price DECIMAL(10, 2),
        low_price DECIMAL(10, 2),
        close_price DECIMAL(10, 2)
    );
`;

// Queries for inserting historical data
const insertHistoricalDataQuery = `
    INSERT INTO historical_stock_data (ticker, date, open_price, high_price, low_price, close_price)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT DO NOTHING;
`;

// Query for retrieving historical data
const getHistoricalDataQuery = `
    SELECT * FROM historical_stock_data
    WHERE ticker = $1
    ORDER BY date DESC;
`;

// Export queries and schema
module.exports = {
    historicalStockTable,
    insertHistoricalDataQuery,
    getHistoricalDataQuery,
};
