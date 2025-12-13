import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Smartphone, Tv, CreditCard, History, User, Calendar } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';

const Dashboard = () => {
  const { userStats, getRecentTransactions, getMonthlyData, transactions } = useUser();
  
  const recentTransactions = getRecentTransactions(3).map(t => ({
    id: t.id,
    type: t.type.includes('Mobile') ? 'Mobile' : t.type.includes('DTH') ? 'DTH' : 'Bill',
    operator: t.operator,
    amount: t.amount,
    date: t.date.split(' ')[0],
    status: t.status
  }));

  const monthlyData = getMonthlyData();

  const getTransactionCount = (type) => {
    return transactions.filter(t => t.type.includes(type) && t.status === 'Success').length;
  };

  const quickActions = [
    { title: 'Mobile Recharge', icon: Smartphone, link: '/mobile-recharge', count: getTransactionCount('Mobile') },
    { title: 'DTH Recharge', icon: Tv, link: '/dth-recharge', count: getTransactionCount('DTH') },
    { title: 'Bill Payment', icon: CreditCard, link: '/bill-payment', count: getTransactionCount('Bill') }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-900 p-3 rounded-lg">
          <BarChart3 size={24} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Smartphone size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">{userStats.totalRecharges}</div>
          <div className="text-gray-600 font-medium">Total Recharges</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">₹{userStats.totalSpent.toLocaleString()}</div>
          <div className="text-gray-600 font-medium">Total Spent</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">₹{userStats.thisMonth.toLocaleString()}</div>
          <div className="text-gray-600 font-medium">This Month</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <User size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">₹{userStats.savedAmount}</div>
          <div className="text-gray-600 font-medium">Cashback Earned</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link 
                  key={index} 
                  to={action.link}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{action.title}</div>
                      <div className="text-sm text-gray-600">{action.count} transactions</div>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
            <Link to="/history" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">{transaction.type} - {transaction.operator}</div>
                  <div className="text-sm text-gray-600">{transaction.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">₹{transaction.amount}</div>
                  <div className="text-sm text-gray-600">{transaction.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Spending Chart */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Spending</h3>
        <div className="flex items-end justify-between h-48 gap-4">
          {monthlyData.map((data, index) => {
            const height = (data.amount / Math.max(...monthlyData.map(d => d.amount))) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="text-sm font-medium text-gray-900 mb-2">₹{data.amount}</div>
                <div 
                  className="w-full bg-gray-900 rounded-t-lg transition-all duration-500"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-sm text-gray-600 mt-2">{data.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Usage Insights */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Usage Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">{getTransactionCount('Mobile')}</div>
            <div className="text-gray-600">Mobile Recharges</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-gray-900 h-2 rounded-full" style={{ width: `${Math.min(100, getTransactionCount('Mobile') * 10)}%` }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">{getTransactionCount('DTH')}</div>
            <div className="text-gray-600">DTH Recharges</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-gray-700 h-2 rounded-full" style={{ width: `${Math.min(100, getTransactionCount('DTH') * 10)}%` }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">{getTransactionCount('Bill')}</div>
            <div className="text-gray-600">Bill Payments</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-gray-600 h-2 rounded-full" style={{ width: `${Math.min(100, getTransactionCount('Bill') * 10)}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;