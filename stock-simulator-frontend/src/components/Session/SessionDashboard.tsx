import React from "react";
import StockItem from "../StockItem";
import NewsItem from "../NewsItem";

const SessionDashboard: React.FC = () => {
  const stocks = [
    { name: "Apple Inc.", price: 150.67, changePercentage: 1.23 },
    { name: "Google LLC", price: 2800.45, changePercentage: -0.56 },
    { name: "Amazon.com Inc.", price: 3300.78, changePercentage: 0.89 },
  ];

  const newsItems = [
    {
      headline: "Trump tariff promises have some retailers facing 'new reality'",
      imageUrl: "https://s.yimg.com/uu/api/res/1.2/XM.2ST7knnHBpMTC4HBhOA--~B/Zmk9c3RyaW07aD0zNjk7cT04MDt3PTY1NjthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2024-10/43f5e7d0-9d48-11ef-be7e-2d1972861d6c.cf.webp",
      link: "https://finance.yahoo.com/news/trumps-tariff-promises-have-import-heavy-retailers-facing-new-reality-133545785.html"
    },
    {
      headline: "What's next for nuclear stocks after regulatory pushback?",
      imageUrl: "https://s.yimg.com/ny/api/res/1.2/fId6RxuBiX385Aiiqdqkxw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTYzOTtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2024-11/abfed7e0-9e12-11ef-bb97-0882bfcc2cef",
      link: "https://finance.yahoo.com/news/whats-next-for-nuclear-stocks-after-regulatory-pushback-160027265.html"
    }
  ];

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex gap-8">
        {/* Stock Visualizations */}
        <div className="flex-1 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-2xl p-6">
          <div className="h-64 flex items-center justify-center text-blue-200 font-light tracking-wider">
            Stock Visualizations
          </div>
        </div>

        {/* List of Stocks */}
        <div className="w-1/3 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl shadow-2xl p-6 backdrop-blur">
          <div className="space-y-4">
            {stocks.map((stock, index) => (
              <StockItem
                key={index}
                name={stock.name}
                price={stock.price}
                changePercentage={stock.changePercentage}
              />
            ))}
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="bg-white/10 backdrop-blur rounded-xl shadow-2xl p-6">
        <h3 className="text-white font-medium mb-4 tracking-wide">Latest News</h3>
        <div className="grid grid-cols-2 gap-4">
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
  );
};

export default SessionDashboard;
