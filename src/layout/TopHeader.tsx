import React from 'react';
import { Plus, Bell, Settings, Menu, User } from 'lucide-react';
import SearchBar from '@/components/SearchBar';

interface TopHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSidebarToggle: () => void;
  className?: string; 
  isMobile?: boolean;
  isTablet?: boolean;
}

const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSidebarToggle,
  className = ""
}) => {
  return (
    <header className={`bg-white border-b border-gray-200 px-4 md:px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onSidebarToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-gray-500" />
          </button>
          
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            placeholder="Search tasks..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus size={16} />
            Create new board
          </button>
          
          <div className="flex items-center gap-2">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={20} className="text-gray-500" />
            </button>
            
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;