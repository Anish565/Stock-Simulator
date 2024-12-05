import React from 'react';

interface Order {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
}

const Orders: React.FC = () => {
  // This would typically come from your backend/state management
  const orders: Order[] = [
    {
      id: '1',
      symbol: 'AAPL',
      type: 'BUY',
      quantity: 10,
      price: 175.23,
      timestamp: '2024-03-20T10:30:00Z',
      status: 'COMPLETED'
    },
    {
      id: '2',
      symbol: 'GOOGL',
      type: 'SELL',
      quantity: 5,
      price: 142.50,
      timestamp: '2024-03-20T11:15:00Z',
      status: 'COMPLETED'
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-gradient-to-br from-gray-800 to-gray-600">
        <thead className="bg-gray-700/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-gray-700/50 divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                {new Date(order.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-100">
                {order.symbol}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {order.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                {order.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                ${order.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                ${(order.quantity * order.price).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                  order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
