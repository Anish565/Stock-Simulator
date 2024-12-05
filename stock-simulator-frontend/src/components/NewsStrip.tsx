import React from "react";

const NewsStrip: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r text-black p-2 text-center overflow-hidden relative">
      <div className="whitespace-nowrap animate-scroll">
        <p>Scrolling Stocks - Apple Inc. (AAPL) ↑ 1.5% | Google LLC (GOOGL) ↓ 0.3% | Amazon.com Inc. (AMZN) ↑ 2.2% | Tesla Inc. (TSLA) ↓ 1.8%</p>
      </div>
    </div>
  );
};

export default NewsStrip;
