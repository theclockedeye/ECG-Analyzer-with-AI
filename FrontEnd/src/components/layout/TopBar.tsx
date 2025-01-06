import { Bell, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ui/ThemeToggle';

export function TopBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between bg-white/80 px-4 backdrop-blur-md dark:bg-gray-900/80">
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 rounded-lg bg-gray-100 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell size={20} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <ThemeToggle />
      </div>
    </div>
  );
}