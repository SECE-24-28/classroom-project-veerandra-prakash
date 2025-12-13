import { useState } from 'react';
import { History, Download, Filter, Search, Check, X, Clock } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';

const TransactionHistory = () => {
  const { transactions } = useUser();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('30days');

  const allTransactions = [
    ...transactions,
    {
      id: 'TXN006',
      type: 'Mobile Recharge',
      number: '9876543210',
      operator: 'Vi',
      amount: 149,
      status: 'Pending',
      date: '2024-12-15 13:45',
      method: 'UPI'
    },
    {
      id: 'TXN007',
      type: 'DTH Recharge',
      number: '1234567890',
      operator: 'Dish TV',
      amount: 399,
      status: 'Success',
      date: '2024-12-14 08:15',
      method: 'Wallet'
    },
    {
      id: 'TXN008',
      type: 'Gas Bill',
      number: 'GB456789123',
      operator: 'Indane Gas',
      amount: 650,
      status: 'Success',
      date: '2024-12-13 17:20',
      method: 'Net Banking'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success':
        return <Check size={16} className="text-gray-800" />;
      case 'Failed':
        return <X size={16} className="text-gray-600" />;
      case 'Pending':
        return <Clock size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return '#1f2937';
      case 'Failed':
        return '#4b5563';
      case 'Pending':
        return '#6b7280';
      default:
        return '#666';
    }
  };

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.status.toLowerCase() === filter;
    const matchesSearch = transaction.number.includes(searchTerm) || 
                         transaction.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalAmount = filteredTransactions
    .filter(t => t.status === 'Success')
    .reduce((sum, t) => sum + t.amount, 0);

  const downloadStatement = () => {
    alert('Statement download feature will be implemented with backend integration');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-900 p-3 rounded-lg">
          <History size={24} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Transaction History</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card stats-card">
          <div className="stats-number" style={{ fontSize: '2rem' }}>
            {filteredTransactions.length}
          </div>
          <div className="stats-label">Total Transactions</div>
        </div>
        <div className="card stats-card">
          <div className="stats-number" style={{ fontSize: '2rem', color: '#1f2937' }}>
            {filteredTransactions.filter(t => t.status === 'Success').length}
          </div>
          <div className="stats-label">Successful</div>
        </div>
        <div className="card stats-card">
          <div className="stats-number" style={{ fontSize: '2rem', color: '#4b5563' }}>
            {filteredTransactions.filter(t => t.status === 'Failed').length}
          </div>
          <div className="stats-label">Failed</div>
        </div>
        <div className="card stats-card">
          <div className="stats-number" style={{ fontSize: '1.5rem', color: '#374151' }}>
            ₹{totalAmount.toLocaleString()}
          </div>
          <div className="stats-label">Total Amount</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by number, operator, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input text-lg h-14 pl-12"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input text-lg h-14 flex-1"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
            <button onClick={downloadStatement} className="btn btn-secondary h-14 px-6">
              <Download size={18} />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Recent Transactions</h3>
        
        {filteredTransactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <History size={48} style={{ opacity: 0.3, marginBottom: '20px' }} />
            <h4>No transactions found</h4>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Transaction ID</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Number</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Operator</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Amount</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Method</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr 
                    key={transaction.id} 
                    style={{ 
                      borderBottom: '1px solid #eee',
                      background: index % 2 === 0 ? '#f9f9f9' : 'white'
                    }}
                  >
                    <td style={{ padding: '15px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                      {transaction.id}
                    </td>
                    <td style={{ padding: '15px', fontWeight: '500' }}>
                      {transaction.type}
                    </td>
                    <td style={{ padding: '15px', fontFamily: 'monospace' }}>
                      {transaction.number}
                    </td>
                    <td style={{ padding: '15px' }}>
                      {transaction.operator}
                    </td>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#333' }}>
                      ₹{transaction.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '5px',
                        color: getStatusColor(transaction.status),
                        fontWeight: '500'
                      }}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </div>
                    </td>
                    <td style={{ padding: '15px', fontSize: '0.9rem', color: '#666' }}>
                      {new Date(transaction.date).toLocaleString()}
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        background: '#e3f2fd',
                        color: '#1976d2',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {transaction.method}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;