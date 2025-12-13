import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      type: 'Mobile Recharge',
      number: '9876543210',
      operator: 'Airtel',
      amount: 299,
      status: 'Success',
      date: '2024-12-20 14:30',
      method: 'UPI'
    },
    {
      id: 'TXN002',
      type: 'DTH Recharge',
      number: '1234567890',
      operator: 'Tata Sky',
      amount: 499,
      status: 'Success',
      date: '2024-12-19 10:15',
      method: 'Debit Card'
    },
    {
      id: 'TXN003',
      type: 'Electricity Bill',
      number: 'EB123456789',
      operator: 'BESCOM',
      amount: 2450,
      status: 'Success',
      date: '2024-12-18 16:45',
      method: 'Net Banking'
    },
    {
      id: 'TXN004',
      type: 'Mobile Recharge',
      number: '9876543210',
      operator: 'Jio',
      amount: 199,
      status: 'Failed',
      date: '2024-12-17 09:20',
      method: 'UPI'
    },
    {
      id: 'TXN005',
      type: 'Water Bill',
      number: 'WB987654321',
      operator: 'Bangalore Water Supply',
      amount: 850,
      status: 'Success',
      date: '2024-12-16 11:30',
      method: 'Credit Card'
    }
  ]);

  const [userStats, setUserStats] = useState({
    totalRecharges: 0,
    totalSpent: 0,
    thisMonth: 0,
    savedAmount: 245,
    lastRecharge: null
  });

  useEffect(() => {
    const successfulTransactions = transactions.filter(t => t.status === 'Success');
    const totalSpent = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthTransactions = successfulTransactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });
    const thisMonthSpent = thisMonthTransactions.reduce((sum, t) => sum + t.amount, 0);

    const lastTransaction = successfulTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    setUserStats({
      totalRecharges: successfulTransactions.length,
      totalSpent,
      thisMonth: thisMonthSpent,
      savedAmount: Math.floor(totalSpent * 0.02),
      lastRecharge: lastTransaction ? lastTransaction.date.split(' ')[0] : null
    });
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: `TXN${String(transactions.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Success'
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const getRecentTransactions = (limit = 5) => {
    return transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const getMonthlyData = () => {
    const monthlySpending = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    transactions.forEach(transaction => {
      if (transaction.status === 'Success') {
        const date = new Date(transaction.date);
        const monthKey = months[date.getMonth()];
        monthlySpending[monthKey] = (monthlySpending[monthKey] || 0) + transaction.amount;
      }
    });

    return months.slice(-5).map(month => ({
      month,
      amount: monthlySpending[month] || 0
    }));
  };

  return (
    <UserContext.Provider value={{
      transactions,
      userStats,
      addTransaction,
      getRecentTransactions,
      getMonthlyData
    }}>
      {children}
    </UserContext.Provider>
  );
};