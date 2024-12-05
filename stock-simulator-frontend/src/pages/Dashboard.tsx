import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SessionModal from "../components/SessionModal";
import Layout from "../components/Layout";
import StockItem from "../components/StockItem";
import NewsItem from "../components/NewsItem";
import SessionItem from "../components/SessionItem";
import StockVisualization from "../components/StockVisualization";

// First, define an interface for the selected stock
interface SelectedStock {
  symbol: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 1, name: "Session 1" },
    { id: 2, name: "Session 2" },
  ]);
  const [selectedStock, setSelectedStock] = useState<SelectedStock>({
    symbol: "AAPL",
    name: "Apple Inc."
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

  const handleStockSelect = (symbol: string, name: string) => {
    setSelectedStock({ symbol, name });
  };

  // Sample data for stocks - updated with symbols
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 150.67, changePercentage: 1.23 },
    { symbol: "GOOGL", name: "Google LLC", price: 2800.45, changePercentage: -0.56 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 3300.78, changePercentage: 0.89 },
  ];

  const newsItems = [
    {
      headline: "Trump tariff promises have some retailers facing 'new reality'",
      imageUrl: "https://s.yimg.com/uu/api/res/1.2/XM.2ST7knnHBpMTC4HBhOA--~B/Zmk9c3RyaW07aD0zNjk7cT04MDt3PTY1NjthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2024-10/43f5e7d0-9d48-11ef-be7e-2d1972861d6c.cf.webp",
      link: "https://finance.yahoo.com/news/trumps-tariff-promises-have-import-heavy-retailers-facing-new-reality-133545785.html"
    },
    {
      headline: "What’s next for nuclear stocks after regulatory pushback?",
      imageUrl: "https://s.yimg.com/ny/api/res/1.2/fId6RxuBiX385Aiiqdqkxw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTYzOTtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2024-11/abfed7e0-9e12-11ef-bb97-0882bfcc2cef",
      link: "https://finance.yahoo.com/news/whats-next-for-nuclear-stocks-after-regulatory-pushback-160027265.html"
    },
    {
      headline: "Cryptocurrency market experiences high volatility",
      link: "https://www.bloomberg.com/news/articles/2024-10-30/cryptocurrency-market-experiences-high-volatility",
    },
  ];

  return (
    <Layout profileImageUrl="data:image/jpeg;base64,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">
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="flex-grow p-6 space-y-6">
          <div className="flex space-x-6">
            {/* Stock Visualizations */}
            <div className="flex-1 bg-gray-500/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg h-full">
              <StockVisualization selectedStock={selectedStock} />
            </div>

            {/* List of Stocks */}
            <div className="w-1/3 bg-gray-500/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg h-full p-4 overflow-y-auto">
              <h3 className="text-gray-200 font-semibold mb-4">List of Stocks</h3>
              <div className="space-y-4">
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
                    headline={news.headline}
                    imageUrl={news.imageUrl}
                    link={news.link}
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
