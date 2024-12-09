import React, { useEffect, useState } from "react";
import StockItem from "../StockItem";
import NewsItem from "../NewsItem";
import { fetchNewsDataFromAPI, fetchSessions, fetchStockMetaData } from "../../utils/apiService";
import StockVisualization from "../StockVisualization";
import { toast } from "react-toastify";
import useWebSocket from "../../utils/websocketService";

interface SelectedStock {
  symbol: string;
  name: string;
  metaData: any;
}


interface News {
  title: string;
  article_url: string;
  image_url?: string;
}

interface Session {
  id: string;
  name: string;
  startAmount: number;
  targetAmount: number;
  duration: string;
  inProgress: boolean;
}

const SessionDashboard: React.FC = () => {

  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [selectedStock, setSelectedStock] = useState<SelectedStock>({
    symbol: "AAPL",
    name: "Apple Inc.",
    metaData: null,
  });
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadSessions = async () => {
      try {
        console.log('Fetching sessions');
        // TODO: Replace "testUser" with actual user ID from authentication
        const fetchedSessions = await fetchSessions("testUser", true);
        console.log('Fetched sessions:', fetchedSessions);
        setSessions(fetchedSessions);
      } catch (error) {
        console.error("Failed to load sessions:", error);
        // Optionally show an error message to the user
      } finally {
        setIsLoading(false);
      }
    };

    loadSessions();
  }, []);

  const handleStockSelect = async (symbol: string, name: string) => {
    const data = await fetchStockMetaData(symbol);
    console.log('MetaData', data);
    setSelectedStock({ symbol, name, metaData: data });
  };

  const fetchNewsData = async () => {
    try {
      console.log('Fetching news data');
      const response = await fetchNewsDataFromAPI();
      console.log('Response', response);
      const { news } = JSON.parse(response.data.body); // Parse the response body
      const formattedNews = news.map((item: any) => ({
        title: item.news.title,
        article_url: item.news.article_url,
        image_url: item.news.image_url,
      }));
      setNewsItems(formattedNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);
  const stocks = useWebSocket();
  // console.log('stocks', stocks);
  // const handleBuyStock = async (symbol: string, price: number) => {
  //   // buyStock = async (sessionId: string, symbol: string, quantity: number, price: number)
  //   console.log(`Buying stock ${symbol} at $${price}`);
  //   // const response = await buyStock(sessions[0]?.id, symbol, 1, price);
  //   // console.log(response);
  //   // toast.success(`Successfully purchased 1 share of ${symbol}!`);
  // };

  // const stocks = [
  //   { symbol: "AAPL", name: "Apple Inc.", price: 243.27, changePercentage: 3.68 },
  //   { symbol: "NVDA", name: "NVIDIA Corporation", price: 145.88, changePercentage: 3.57 },
  //   { symbol: "MSFT", name: "Microsoft Corporation", price: 442.65, changePercentage: 3.29 },
  //   { symbol: "AMZN", name: "Amazon.com, Inc.", price: 221.30, changePercentage: 2.33 },
  //   { symbol: "GOOGL", name: "Alphabet Inc. (Class A)", price: 2800.45, changePercentage: -0.56 }, // Approximate price, actual may vary
  //   { symbol: "GOOG", name: "Alphabet Inc. (Class C)", price: 2800.45, changePercentage: -0.56 }, // Approximate price, actual may vary
  //   { symbol: "TSLA", name: "Tesla, Inc.", price: 345.16, changePercentage: 1.11 },
  //   { symbol: "XOM", name: "Exxon Mobil Corporation", price: 117.96, changePercentage: 0.25 },
  //   { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 174.49, changePercentage: -0.29 }, // Approximate price
  //   { symbol: "V", name: "Visa Inc.", price: 532.94, changePercentage: 0.11 },
  //   { symbol: "MA", name: "Mastercard Incorporated", price: 532.94, changePercentage: 0.11 },
  //   { symbol: "PG", name: "Procter & Gamble Company", price: 154.49, changePercentage: -0.29 }, // Approximate price
  //   { symbol: "C", name: "Citigroup Inc.", price: 76.17, changePercentage: -1.35 },
  //   { symbol: "GE", name: "General Electric Company", price: 180.40, changePercentage: -0.02 },
  //   { symbol: "BAC", name: "Bank of America Corporation", price: 34.41, changePercentage: -0.29 }, // Approximate price
  //   { symbol: "UNH", name: "UnitedHealth Group Incorporated", price: 484.15, changePercentage: 0.61 }, // Approximate price
  //   { symbol: "MRK", name: "Merck & Co., Inc.", price: 101.64, changePercentage: -1.44 },
  //   { symbol: "WFC", name: "Wells Fargo & Company", price: 76.17, changePercentage: -1.35 },
  //   { symbol: "KO", name: "The Coca-Cola Company", price: 64.08, changePercentage: -0.54 },
  //   { symbol: "MCD", name: "McDonald's Corporation", price: 295.11, changePercentage: 0.29 }, // Approximate price
  //   { symbol: "MMM", name: "3M Company", price: 173.35, changePercentage: -0.29 }, // Approximate price
  //   { symbol: "IBM", name: "International Business Machines Corporation", price: 143.11, changePercentage: 0.29 }, // Approximate price
  //   { symbol: "CAT", name: "Caterpillar Inc.", price: 396.70, changePercentage: -1.44 },
  //   { symbol: "DE", name: "Deere & Company", price: 465.90, changePercentage: -0.02 },
  //   { symbol: "HON", name: "Honeywell International Inc.", price: 232.93, changePercentage: 1.43 },
  //   { symbol: "BA", name: "The Boeing Company", price: 155.82, changePercentage: -0.46 },
  //   { symbol: "UPS", name: "United Parcel Service, Inc.", price: 129.69, changePercentage: -3.23 },
  //   { symbol: "FDX", name: "FedEx Corporation", price: 244.11, changePercentage: 0.29 }, // Approximate price
  //   { symbol: "VZ", name: "Verizon Communications Inc.", price: 43.93, changePercentage: 0.18 },
  //   { symbol: "T", name: "AT&T Inc.", price: 19.35, changePercentage: -0.29 }, // Approximate price
  //   { symbol: "NEE", name: "NextEra Energy, Inc.", price: 76.45, changePercentage: -0.80 },
  //   { symbol: "DUK", name: "Duke Energy Corporation", price: 108.35, changePercentage: 0.29 }, // Approximate price
  //   { symbol: "SO", name: "The Southern Company", price: 73.19, changePercentage: 0.29 }, // Approximate price
  //   { symbol: "LOW", name: "Lowe's Companies, Inc.", price: 270.31, changePercentage: -0.64 },
  //   { symbol: "HD", name: "The Home Depot, Inc.", price: 334.49, changePercentage: 0.29 }, // Approximate price
  //   { symbol: "NKE", name: "NIKE, Inc.", price: 79.24, changePercentage: 0.19 },
  //   { symbol: "GILD", name: "Gilead Sciences, Inc.", price: 94.34, changePercentage: 0.34 },
  //   { symbol: "VRTX", name: "Vertex Pharmaceuticals Incorporated", price: 461.77, changePercentage: -0.85 },
  //   { symbol: "MU", name: "Micron Technology, Inc.", price: 101.50, changePercentage: 2.99 },
  //   { symbol: "LMT", name: "Lockheed Martin Corporation", price: 520.56, changePercentage: 0.04 },
  //   { symbol: "RTX", name: "RTX Corporation", price: 118.53, changePercentage: -0.13 },
  //   { symbol: "BLK", name: "BlackRock, Inc.", price: 1034.64, changePercentage: 1.42 },
  //   { symbol: "SPGI", name: "S&P Global Inc.", price: 519.61, changePercentage: -0.62 },
  //   { symbol: "AVGO", name: "Broadcom Inc.", price: 162.08, changePercentage: 1.51 },
  //   { symbol: "ORCL", name: "Oracle Corporation", price: 184.84, changePercentage: 1.17 },
  //   { symbol: "COST", name: "Costco Wholesale Corporation", price: 971.88, changePercentage: 1.07 },
  //   { symbol: "TMUS", name: "T-Mobile US, Inc.", price: 246.94, changePercentage: 0.30 },
  //   { symbol: "SBUX", name: "Starbucks Corporation", price: 101.11, changePercentage: -0.40 },
  //   { symbol: "PANW", name: "Palo Alto Networks, Inc.", price: 387.82, changePercentage: 0.90 },
  //   { symbol: "ADP", name: "Automatic Data Processing, Inc.", price: 303.34, changePercentage: -0.88 },
  //   { symbol: "SYK", name: "Stryker Corporation", price: 392.15, changePercentage: 1.03 },
  //   { symbol: "BSX", name: "Boston Scientific Corporation", price: 90.66, changePercentage: -0.10 },
  //   { symbol: "ANET", name: "Arista Networks, Inc.", price: 405.82, changePercentage: 0.88 },
  //   { symbol: "SHOP", name: "Shopify Inc.", price: 115.60, changePercentage: 2.72 },
  //   { symbol: "LLY", name: "Eli Lilly and Company", price: 795.35, changePercentage: 0.91 },
  //   { symbol: "ZTS", name: "Zoetis Inc.", price: 180.11, changePercentage: 1.87 },
  //   { symbol: "REGN", name: "Regeneron Pharmaceuticals, Inc.", price: 754.95, changePercentage: -0.97 },
  //   { symbol: "ITW", name: "Illinois Tool Works Inc.", price: 274.95, changePercentage: -1.27 },
  //   { symbol: "USB", name: "U.S. Bancorp", price: 51.89, changePercentage: -1.68 },
  //   { symbol: "SCCO", name: "Southern Copper Corporation", price: 101.63, changePercentage: 1.58 },
  //   { symbol: "RACE", name: "Ferrari N.V.", price: 443.22, changePercentage: 1.33 },
  // ];

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex space-x-6">
        {/* Stock Visualizations */}
        <div className="flex-1 bg-gray-500/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg h-full">
          <StockVisualization selectedStock={selectedStock} />
        </div>

        {/* List of Stocks */}
        <div className="w-1/3 bg-gray-500/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg h-[calc(100vh-24rem)] p-4">
              <h3 className="text-gray-200 font-semibold mb-4">List of Stocks</h3>
              <div className="space-y-4 h-[calc(100%-3rem)] overflow-y-auto pr-2">
                {
                  Object.entries(stocks).map(([symbol, data]) => (
                    <StockItem
                      key={symbol}
                      symbol={symbol} 
                      name={(data as {name: string}).name}
                      price={(data as {price: number}).price}
                      volume={(data as {dayVolume: number}).dayVolume}
                      onSelect={() => handleStockSelect(symbol, (data as {name: string}).name)}
                      changePercentage={(data as {changePercent: number}).changePercent}
                      showBuyButton={true}
                    />
                  ))
                }
              </div>
            </div>
      </div>

      {/* News Section - Updated styles */}
      <div className="w-full h-64">
        <div className="w-full bg-gray-500/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg h-full p-4 overflow-y-auto">
          <h3 className="text-gray-200 font-semibold mb-4">News</h3>
          <div className="space-y-4">
            {newsItems.map((news, index) => (
              <NewsItem
                key={index}
                headline={news.title}
                imageUrl={news.image_url}
                link={news.article_url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDashboard;
