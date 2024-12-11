import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSessionOrders } from '../../utils/apiService';

interface Order {
  orderId: string;
  symbol: string;
  purpose: 'Buy' | 'Sell';
  quantity: number;
  price: number;
  totalPrice: number;
  timestamp: string;
  status: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: sessionId } = useParams<{ id: string }>();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        if (!sessionId) {
          throw new Error('No session ID provided');
        }
        const fetchedOrders = await fetchSessionOrders(sessionId);
        setOrders(fetchedOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [sessionId]);

  if (loading) {
    return <div className="text-center py-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

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
            <tr key={order.orderId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                {new Date(order.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-100">
                {order.symbol}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.purpose === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {order.purpose}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                {order.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                ${order.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                ${order.totalPrice.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' : 
                  order.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
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
