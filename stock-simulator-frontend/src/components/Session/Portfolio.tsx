import React, { useState } from 'react';

interface Stock {
  symbol: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
}

interface PortfolioProps {
  walletBalance: number;
  totalInvested: number;
  stocks: Stock[];
}

const formatMoney = (amount: number): string => {
  return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

// Add new interface for sell modal
interface SellModalProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
  onSell: (symbol: string, quantity: number) => void;
}

// Add SellModal component
const SellModal: React.FC<SellModalProps> = ({ stock, isOpen, onClose, onSell }) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleSell = () => {
    if (quantity > 0 && quantity <= stock.quantity) {
      onSell(stock.symbol, quantity);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Sell {stock.symbol}</h3>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Available: {stock.quantity} shares</p>
          <p className="text-sm text-gray-600 mb-2">Current Price: {formatMoney(stock.currentPrice)}</p>
          <input
            type="number"
            min="1"
            max={stock.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Enter quantity to sell"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSell}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={quantity <= 0 || quantity > stock.quantity}
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC<PortfolioProps> = () => {
  // Add state for sell modal
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // Add sell handler
  const handleSell = (symbol: string, quantity: number) => {
    // TODO: Implement sell logic here
    console.log(`Selling ${quantity} shares of ${symbol}`);
  };

  // Sample stock data
  const stocks: Stock[] = [
    {
      symbol: "AAPL",
      quantity: 10,
      buyPrice: 175.50,
      currentPrice: 188.75
    },
    {
      symbol: "GOOGL",
      quantity: 5,
      buyPrice: 2750.00,
      currentPrice: 2830.25
    },
    {
      symbol: "MSFT",
      quantity: 15,
      buyPrice: 310.25,
      currentPrice: 337.50
    },
    {
      symbol: "AMZN",
      quantity: 8,
      buyPrice: 135.75,
      currentPrice: 142.80
    }
  ];

  // Calculate total invested amount
  const totalInvested = stocks.reduce((total, stock) => 
    total + (stock.quantity * stock.buyPrice), 0);

  // Sample wallet balance
  const walletBalance = 10000;

  // Calculate total portfolio value based on current prices
  const portfolioValue = stocks.reduce((total, stock) => 
    total + (stock.quantity * stock.currentPrice), 0);
  
  // Calculate total profit/loss
  const totalProfitLoss = portfolioValue - totalInvested;
  const profitLossPercent = (totalProfitLoss / totalInvested) * 100;

  return (
    <div className="p-6">
      {/* Portfolio Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Wallet Balance</h3>
          <p className="text-2xl font-bold">{formatMoney(walletBalance)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Invested</h3>
          <p className="text-2xl font-bold">{formatMoney(totalInvested)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total P/L</h3>
          <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatMoney(totalProfitLoss)}
            <span className="text-sm ml-1 opacity-75">
              ({profitLossPercent.toFixed(2)}%)
            </span>
          </p>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Holdings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Stock</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Quantity</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Avg. Buy Price</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Current Price</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Total Value</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">P/L</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => {
                const value = stock.quantity * stock.currentPrice;
                const profitLoss = value - (stock.quantity * stock.buyPrice);
                const plPercent = (profitLoss / (stock.quantity * stock.buyPrice)) * 100;

                return (
                  <tr key={stock.symbol} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">{stock.symbol}</td>
                    <td className="py-3 px-4">{stock.quantity}</td>
                    <td className="py-3 px-4">{formatMoney(stock.buyPrice)}</td>
                    <td className="py-3 px-4">{formatMoney(stock.currentPrice)}</td>
                    <td className="py-3 px-4">{formatMoney(value)}</td>
                    <td className={`py-3 px-4 ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatMoney(profitLoss)}
                      <span className="text-sm ml-1 opacity-75">
                        ({plPercent.toFixed(2)}%)
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setSelectedStock(stock);
                          setIsSellModalOpen(true);
                        }}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add sell modal */}
      {selectedStock && (
        <SellModal
          stock={selectedStock}
          isOpen={isSellModalOpen}
          onClose={() => {
            setIsSellModalOpen(false);
            setSelectedStock(null);
          }}
          onSell={handleSell}
        />
      )}
    </div>
  );
};

export default Portfolio;
