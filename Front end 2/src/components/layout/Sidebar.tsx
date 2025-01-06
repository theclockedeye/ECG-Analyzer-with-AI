import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, Upload, LineChart, User, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const menuItems = [
  { icon: Home, label: 'Overview', path: '/dashboard' },
  { icon: Upload, label: 'Upload ECG', path: '/dashboard/upload' },
  { icon: LineChart, label: 'Results', path: '/dashboard/results' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="fixed left-0 top-0 h-screen bg-white/80 backdrop-blur-md dark:bg-gray-900/80"
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-gray-900 dark:text-white"
          >
            ECG Analyzer
          </motion.span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="mt-4 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              'mb-2 flex items-center rounded-lg px-4 py-2 transition-colors',
              location.pathname === item.path
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
            )}
          >
            <item.icon size={20} />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-3"
              >
                {item.label}
              </motion.span>
            )}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}