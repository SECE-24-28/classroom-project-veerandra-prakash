import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Smartphone, Tv, CreditCard, History, Gift, User, Zap, Info, Phone, ChevronDown, BarChart3 } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Zap },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/mobile-recharge', label: 'Mobile Recharge', icon: Smartphone },
    { path: '/dth-recharge', label: 'DTH Recharge', icon: Tv },
    { path: '/bill-payment', label: 'Bill Payment', icon: CreditCard },
    { path: '/history', label: 'History', icon: History },
    { path: '/offers', label: 'Offers', icon: Gift },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const infoItems = [
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav className="bg-white py-3 shadow-sm sticky top-0 z-50 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          LivPay
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-2 py-2 font-medium text-sm transition-all duration-200 ${
                  isActive 
                    ? 'text-gray-900 border-b-2 border-gray-800 font-semibold' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={14} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 px-2 py-2 font-medium text-sm transition-all duration-200 ${
                infoItems.some(item => location.pathname === item.path) 
                  ? 'text-gray-900 border-b-2 border-gray-800 font-semibold' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Info size={14} />
              <span className="text-sm">More</span>
              <ChevronDown size={10} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-50 min-w-36">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setDropdownOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-gray-100 text-gray-900 font-semibold border-l-2 border-gray-800' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={14} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white mt-2 mx-4 rounded-md p-3 shadow-md border border-gray-200">
          {[...navItems, ...infoItems].map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 font-medium text-sm transition-all duration-200 mb-1 last:mb-0 border-b border-gray-100 last:border-b-0 ${
                  isActive 
                    ? 'text-gray-900 bg-gray-50 font-semibold' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
