import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SessionModal from "../components/SessionModal";
import Layout from "../components/Layout";
import StockItem from "../components/StockItem";
import NewsItem from "../components/NewsItem";
import SessionItem from "../components/SessionItem";
import StockVisualization from "../components/StockVisualization";
import { fetchStockMetaData, fetchNewsDataFromAPI } from "../utils/apiService";

// First, define an interface for the selected stock
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


const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [sessions, setSessions] = useState([
    { id: 1, name: "Session 1" },
    { id: 2, name: "Session 2" },
  ]);
  const [selectedStock, setSelectedStock] = useState<SelectedStock>({
    symbol: "AAPL",
    name: "Apple Inc.",
    metaData: null,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteSession = (id: number) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

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

  // Sample data for stocks - updated with symbols
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 243.27, changePercentage: 3.68 },
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 145.88, changePercentage: 3.57 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 442.65, changePercentage: 3.29 },
    { symbol: "AMZN", name: "Amazon.com, Inc.", price: 221.30, changePercentage: 2.33 },
    { symbol: "GOOGL", name: "Alphabet Inc. (Class A)", price: 2800.45, changePercentage: -0.56 }, // Approximate price, actual may vary
    { symbol: "GOOG", name: "Alphabet Inc. (Class C)", price: 2800.45, changePercentage: -0.56 }, // Approximate price, actual may vary
    { symbol: "TSLA", name: "Tesla, Inc.", price: 345.16, changePercentage: 1.11 },
    { symbol: "XOM", name: "Exxon Mobil Corporation", price: 117.96, changePercentage: 0.25 },
    { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 174.49, changePercentage: -0.29 }, // Approximate price
    { symbol: "V", name: "Visa Inc.", price: 532.94, changePercentage: 0.11 },
    { symbol: "MA", name: "Mastercard Incorporated", price: 532.94, changePercentage: 0.11 },
    { symbol: "PG", name: "Procter & Gamble Company", price: 154.49, changePercentage: -0.29 }, // Approximate price
    { symbol: "C", name: "Citigroup Inc.", price: 76.17, changePercentage: -1.35 },
    { symbol: "GE", name: "General Electric Company", price: 180.40, changePercentage: -0.02 },
    { symbol: "BAC", name: "Bank of America Corporation", price: 34.41, changePercentage: -0.29 }, // Approximate price
    { symbol: "UNH", name: "UnitedHealth Group Incorporated", price: 484.15, changePercentage: 0.61 }, // Approximate price
    { symbol: "MRK", name: "Merck & Co., Inc.", price: 101.64, changePercentage: -1.44 },
    { symbol: "WFC", name: "Wells Fargo & Company", price: 76.17, changePercentage: -1.35 },
    { symbol: "KO", name: "The Coca-Cola Company", price: 64.08, changePercentage: -0.54 },
    { symbol: "MCD", name: "McDonald's Corporation", price: 295.11, changePercentage: 0.29 }, // Approximate price
    { symbol: "MMM", name: "3M Company", price: 173.35, changePercentage: -0.29 }, // Approximate price
    { symbol: "IBM", name: "International Business Machines Corporation", price: 143.11, changePercentage: 0.29 }, // Approximate price
    { symbol: "CAT", name: "Caterpillar Inc.", price: 396.70, changePercentage: -1.44 },
    { symbol: "DE", name: "Deere & Company", price: 465.90, changePercentage: -0.02 },
    { symbol: "HON", name: "Honeywell International Inc.", price: 232.93, changePercentage: 1.43 },
    { symbol: "BA", name: "The Boeing Company", price: 155.82, changePercentage: -0.46 },
    { symbol: "UPS", name: "United Parcel Service, Inc.", price: 129.69, changePercentage: -3.23 },
    { symbol: "FDX", name: "FedEx Corporation", price: 244.11, changePercentage: 0.29 }, // Approximate price
    { symbol: "VZ", name: "Verizon Communications Inc.", price: 43.93, changePercentage: 0.18 },
    { symbol: "T", name: "AT&T Inc.", price: 19.35, changePercentage: -0.29 }, // Approximate price
    { symbol: "NEE", name: "NextEra Energy, Inc.", price: 76.45, changePercentage: -0.80 },
    { symbol: "DUK", name: "Duke Energy Corporation", price: 108.35, changePercentage: 0.29 }, // Approximate price
    { symbol: "SO", name: "The Southern Company", price: 73.19, changePercentage: 0.29 }, // Approximate price
    { symbol: "LOW", name: "Lowe's Companies, Inc.", price: 270.31, changePercentage: -0.64 },
    { symbol: "HD", name: "The Home Depot, Inc.", price: 334.49, changePercentage: 0.29 }, // Approximate price
    { symbol: "NKE", name: "NIKE, Inc.", price: 79.24, changePercentage: 0.19 },
    { symbol: "GILD", name: "Gilead Sciences, Inc.", price: 94.34, changePercentage: 0.34 },
    { symbol: "VRTX", name: "Vertex Pharmaceuticals Incorporated", price: 461.77, changePercentage: -0.85 },
    { symbol: "MU", name: "Micron Technology, Inc.", price: 101.50, changePercentage: 2.99 },
    { symbol: "LMT", name: "Lockheed Martin Corporation", price: 520.56, changePercentage: 0.04 },
    { symbol: "RTX", name: "RTX Corporation", price: 118.53, changePercentage: -0.13 },
    { symbol: "BLK", name: "BlackRock, Inc.", price: 1034.64, changePercentage: 1.42 },
    { symbol: "SPGI", name: "S&P Global Inc.", price: 519.61, changePercentage: -0.62 },
    { symbol: "AVGO", name: "Broadcom Inc.", price: 162.08, changePercentage: 1.51 },
    { symbol: "ORCL", name: "Oracle Corporation", price: 184.84, changePercentage: 1.17 },
    { symbol: "COST", name: "Costco Wholesale Corporation", price: 971.88, changePercentage: 1.07 },
    { symbol: "TMUS", name: "T-Mobile US, Inc.", price: 246.94, changePercentage: 0.30 },
    { symbol: "SBUX", name: "Starbucks Corporation", price: 101.11, changePercentage: -0.40 },
    { symbol: "PANW", name: "Palo Alto Networks, Inc.", price: 387.82, changePercentage: 0.90 },
    { symbol: "ADP", name: "Automatic Data Processing, Inc.", price: 303.34, changePercentage: -0.88 },
    { symbol: "SYK", name: "Stryker Corporation", price: 392.15, changePercentage: 1.03 },
    { symbol: "BSX", name: "Boston Scientific Corporation", price: 90.66, changePercentage: -0.10 },
    { symbol: "ANET", name: "Arista Networks, Inc.", price: 405.82, changePercentage: 0.88 },
    { symbol: "SHOP", name: "Shopify Inc.", price: 115.60, changePercentage: 2.72 },
    { symbol: "LLY", name: "Eli Lilly and Company", price: 795.35, changePercentage: 0.91 },
    { symbol: "ZTS", name: "Zoetis Inc.", price: 180.11, changePercentage: 1.87 },
    { symbol: "REGN", name: "Regeneron Pharmaceuticals, Inc.", price: 754.95, changePercentage: -0.97 },
    { symbol: "ITW", name: "Illinois Tool Works Inc.", price: 274.95, changePercentage: -1.27 },
    { symbol: "USB", name: "U.S. Bancorp", price: 51.89, changePercentage: -1.68 },
    { symbol: "SCCO", name: "Southern Copper Corporation", price: 101.63, changePercentage: 1.58 },
    { symbol: "RACE", name: "Ferrari N.V.", price: 443.22, changePercentage: 1.33 },
  ];

  // const newsItems = [
  //   {
  //     headline: "Trump tariff promises have some retailers facing 'new reality'",
  //     imageUrl: "https://s.yimg.com/uu/api/res/1.2/XM.2ST7knnHBpMTC4HBhOA--~B/Zmk9c3RyaW07aD0zNjk7cT04MDt3PTY1NjthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2024-10/43f5e7d0-9d48-11ef-be7e-2d1972861d6c.cf.webp",
  //     link: "https://finance.yahoo.com/news/trumps-tariff-promises-have-import-heavy-retailers-facing-new-reality-133545785.html"
  //   },
  //   {
  //     headline: "What’s next for nuclear stocks after regulatory pushback?",
  //     imageUrl: "https://s.yimg.com/ny/api/res/1.2/fId6RxuBiX385Aiiqdqkxw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTYzOTtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2024-11/abfed7e0-9e12-11ef-bb97-0882bfcc2cef",
  //     link: "https://finance.yahoo.com/news/whats-next-for-nuclear-stocks-after-regulatory-pushback-160027265.html"
  //   },
  //   {
  //     headline: "Cryptocurrency market experiences high volatility",
  //     link: "https://www.bloomberg.com/news/articles/2024-10-30/cryptocurrency-market-experiences-high-volatility",
  //   },
  // ];

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="flex-grow p-6 space-y-6">
          <div className="flex space-x-6">
            {/* Stock Visualizations */}
            <div className="flex-1 bg-gray-500/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg h-full">
              <StockVisualization selectedStock={selectedStock} />
            </div>

            {/* List of Stocks */}
            <div className="w-1/3 bg-gray-500/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg h-[calc(100vh-24rem)] p-4">
              <h3 className="text-gray-200 font-semibold mb-4">List of Stocks</h3>
              <div className="space-y-4 h-[calc(100%-3rem)] overflow-y-auto pr-2">
                {stocks.map((stock) => (
                  <StockItem
                    key={stock.symbol}
                    {...stock}
                    onSelect={() => handleStockSelect(stock.symbol, stock.name)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-6 h-64">
            {/* Session Section - Updated styling */}
            <div className="flex-1 bg-gray-500/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg h-full p-4 relative overflow-y-auto">
              {sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg mb-2 flex items-center justify-center active:scale-95 transition-all duration-100"
                    onClick={openModal}
                  >
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                  </button>
                  <p className="text-gray-300">Create a Session</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-200">Sessions</h3>
                    <button
                      onClick={openModal}
                      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  {sessions.map((session) => (
                    <SessionItem key={session.id} name={session.name} onDelete={() => handleDeleteSession(session.id)} />
                  ))}
                </div>
              )}
            </div>

            {/* News Section - Updated styling */}
            <div className="w-1/3 bg-gray-500/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg h-full p-4 overflow-y-auto">
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
      </div>

      {isModalOpen && <SessionModal onClose={closeModal} />}
    </Layout> 
  );
};

export default Dashboard;
