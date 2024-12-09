import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { fetchSessionWatchlist, fetchStockMetaData } from '../../utils/apiService';
import { useParams } from 'react-router-dom';
import useWebSocket from '../../utils/websocketService';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

interface BuyModalState {
  isOpen: boolean;
  stock: Stock | null;
}

const Watchlist: React.FC = () => {
  const { id: sessionId } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const stocks = useWebSocket();
  console.log('stocks', stocks);
  // Fetch watchlist data on component mount
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      setLoading(true);
      console.log("Fetching watchlist API Call:", sessionId);
      if (!sessionId) return;
      const watchlistSymbols = await fetchSessionWatchlist(sessionId);
      setLoading(false);
      setSymbols(watchlistSymbols);
      setLoading(false);
    };
    loadWatchlist();
  }, [sessionId]);
     

  useEffect(() => {
    const loadStockDetails = async () => {
      const stockDetails = await Promise.all(
        symbols.map(async (symbol: string) => {
          const data = await fetchStockMetaData(symbol);
          return {
            symbol,
            name: data.data.name || symbol,
            price: stocks[symbol]?.price || 0,
            changePercent: stocks[symbol]?.changePercent || 0
          };
        })
      );
      setWatchlist(stockDetails);
    };
    
    loadStockDetails();
  }, [symbols, stocks]);

  const [buyModal, setBuyModal] = useState<BuyModalState>({
    isOpen: false,
    stock: null
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement stock search API call
    console.log('Searching for:', searchTerm);
  };

  // const handleAddStock = (stock: Stock) => {
  //   if (!watchlist.find(s => s.symbol === stock.symbol)) {
  //     setWatchlist([...watchlist, stock]);
  //   }
  // };

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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Modern Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stocks..."
            className="w-full px-5 py-3 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          />
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
        >
          Search
        </button>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-red-500 text-center py-4">
          {error}
        </div>
      )}

      {/* Watchlist table - only show if not loading and no error */}
      {!loading && !error && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-100 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-100 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-100 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {watchlist.map((stock) => (
                <tr
                  key={stock.symbol}
                  onClick={() => handleStockClick(stock)}
                  className="hover:bg-gray-700/50 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-gray-100 whitespace-nowrap">{stock.symbol}</td>
                  <td className="px-6 py-4 text-gray-100 whitespace-nowrap">{stock.name}</td>
                  <td className="px-6 py-4 text-gray-100 whitespace-nowrap text-right">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-right ${
                    stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveStock(stock.symbol);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all duration-200"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {watchlist.length === 0 && (
            <div className="text-gray-400 text-center py-8">
              No stocks in watchlist. Use the search bar to add stocks.
            </div>
          )}
        </div>
      )}

      {/* Modern Modal */}
      {buyModal.isOpen && buyModal.stock && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto z-1000">
          <div className="relative top-20 mx-auto p-6 w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Buy {buyModal.stock.symbol}
                </h3>
                <p className="text-gray-500">
                  Current Price: ${buyModal.stock.price.toFixed(2)}
                </p>
                <input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  onChange={(e) => {
                    const quantity = parseInt(e.target.value);
                    if (!isNaN(quantity) && quantity > 0) {
                      // You can add quantity to state if needed
                    }
                  }}
                />
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleBuyStock(1)}
                    className="px-5 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
