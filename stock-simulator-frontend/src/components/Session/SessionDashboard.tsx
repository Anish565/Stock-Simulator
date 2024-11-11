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
    <div className="space-y-6">
      <div className="flex space-x-6">
        {/* Stock Visualizations Placeholder */}
        <div className="flex-1 bg-blue-800 h-64 flex items-center justify-center text-green-200">
          Stock Visualizations
        </div>

        {/* List of Stocks */}
        <div className="w-1/3 bg-[#8b4242] h-64 p-4 overflow-y-auto rounded">
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
        <div className="w-full bg-gray-300 h-40 p-4 overflow-y-auto rounded">
          <h3 className="text-black font-semibold mb-2">News</h3>
          <div className="space-y-2">
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
