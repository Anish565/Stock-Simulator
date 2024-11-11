import React, { useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface BuyModalState {
  isOpen: boolean;
  stock: Stock | null;
}

const Watchlist: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState<Stock[]>([
    // Mock data - replace with actual API data
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 173.50,
      change: 2.30,
      changePercent: 1.34
    },
    // ... more stocks
  ]);

  const [buyModal, setBuyModal] = useState<BuyModalState>({
    isOpen: false,
    stock: null
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement stock search API call
    console.log('Searching for:', searchTerm);
  };

  const handleAddStock = (stock: Stock) => {
    if (!watchlist.find(s => s.symbol === stock.symbol)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  const handleRemoveStock = (symbol: string) => {
    setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
  };

  const handleStockClick = (stock: Stock) => {
    setBuyModal({
      isOpen: true,
      stock
    });
  };

  const handleCloseModal = () => {
    setBuyModal({
      isOpen: false,
      stock: null
    });
  };

  const handleBuyStock = (quantity: number) => {
    if (!buyModal.stock) return;
    
    // TODO: Implement buy stock API call
    console.log(`Buying ${quantity} shares of ${buyModal.stock.symbol}`);
    handleCloseModal();
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stocks..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Watchlist Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {watchlist.map((stock) => (
              <tr
                key={stock.symbol}
                onClick={() => handleStockClick(stock)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">{stock.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stock.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  ${stock.price.toFixed(2)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-right ${
                  stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveStock(stock.symbol);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buy Stock Modal */}
      {buyModal.isOpen && buyModal.stock && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Buy {buyModal.stock.symbol}
              </h3>
              <div className="mt-2 pb-4">
                <p className="text-sm text-gray-500">
                  Current Price: ${buyModal.stock.price.toFixed(2)}
                </p>
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  className="w-full px-3 py-2 border rounded-md"
                  onChange={(e) => {
                    const quantity = parseInt(e.target.value);
                    if (!isNaN(quantity) && quantity > 0) {
                      // You can add quantity to state if needed
                    }
                  }}
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleBuyStock(1)} // Replace 1 with actual quantity
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
