import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext.jsx';
import Navigation from './Components/Navigation.jsx';
import Home from './Components/Home.jsx';
import Dashboard from './Components/Dashboard.jsx';
import MobileRecharge from './Components/MobileRecharge.jsx';
import DTHRecharge from './Components/DTHRecharge.jsx';
import BillPayment from './Components/BillPayment.jsx';
import TransactionHistory from './Components/TransactionHistory.jsx';
import Offers from './Components/Offers.jsx';
import Profile from './Components/Profile.jsx';
import QuickRecharge from './Components/QuickRecharge.jsx';
import About from './Components/About.jsx';
import Contact from './Components/Contact.jsx';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mobile-recharge" element={<MobileRecharge />} />
              <Route path="/dth-recharge" element={<DTHRecharge />} />
              <Route path="/bill-payment" element={<BillPayment />} />
              <Route path="/history" element={<TransactionHistory />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/quick-recharge" element={<QuickRecharge />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
