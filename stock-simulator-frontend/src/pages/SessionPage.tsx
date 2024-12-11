import React, { useState } from "react";
import Layout from "../components/Layout";
import SessionDashboard from "../components/Session/SessionDashboard";
import SessionInfo from '../components/Session/SessionInfo';
import Watchlist from '../components/Session/Watchlist';
import Portfolio from '../components/Session/Portfolio';
import Orders from '../components/Session/Orders';

const SessionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Session Dashboard' },
    { id: 'info', label: 'Session Info' },
    { id: 'watchlist', label: 'Watchlist' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'orders', label: 'Orders' },
  ];

  // Mock data for SessionInfo - replace with real data from your backend
  // const sessionData = {
  //   sessionId: "sess_123456",
  //   sessionName: "My Trading Session",
  //   startAmount: 100000,
  //   investedAmount: 75000,
  //   targetAmount: 150000,
  //   duration: "2024-01-01 to 2024-12-31",
  //   currentValue: 110000
  // };

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen text-gray-100 space-y-6">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content - wrapped in a glass-morphism container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-gray-700">
          {activeTab === 'dashboard' && <SessionDashboard />}
          {activeTab === 'info' && <SessionInfo/>}
          {activeTab === 'watchlist' && <Watchlist />}
          {activeTab === 'portfolio' && (
            <Portfolio />
          )}
          {activeTab === 'orders' && <Orders />}
        </div>
      </div>
    </Layout>
  );
};

export default SessionPage;
