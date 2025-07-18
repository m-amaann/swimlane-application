import React from 'react';
import { 
  Home, 
  Folder, 
  Calendar, 
  Users, 
  MessageSquare, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  X
} from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  isMobile: boolean;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  onToggle,
  isMobile,
  className = ""
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isExpanded ? 'w-64' : 'w-16'} 
        ${isMobile && isExpanded ? 'fixed inset-y-0 left-0 z-50' : ''}
        bg-white border-r border-gray-200 transition-all duration-300 flex flex-col
        ${className}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            {isExpanded && (
              <div>
                <h2 className="font-semibold text-gray-900">Board App</h2>
                <p className="text-xs text-gray-500">Root folder</p>
              </div>
            )}
            {isMobile && (
              <button 
                onClick={onToggle}
                className="ml-auto p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600">
              <Home size={20} />
              {isExpanded && <span className="font-medium">Dashboard</span>}
            </div>
            
            <div className="mt-6">
              {isExpanded && (
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                  Projects
                </p>
              )}
              
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <Folder size={20} className="text-gray-500" />
                  {isExpanded && (
                    <>
                      <span className="text-gray-700 font-medium flex-1">Boards</span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </>
                  )}
                </div>
                
                {isExpanded && (
                  <div className="ml-8 space-y-1">
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg font-medium">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      Sport Xi Project
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Development React App
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      WordPress theme
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <MessageSquare size={20} className="text-gray-500" />
                {isExpanded && (
                  <>
                    <span className="text-gray-700">Messages</span>
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 font-medium">3</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Calendar size={20} className="text-gray-500" />
                {isExpanded && <span className="text-gray-700">Calendar</span>}
              </div>
              
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Users size={20} className="text-gray-500" />
                {isExpanded && <span className="text-gray-700">Team members</span>}
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <HelpCircle size={20} className="text-gray-500" />
              {isExpanded && <span className="text-gray-700">Support</span>}
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 cursor-pointer text-red-600 transition-colors">
              <LogOut size={20} />
              {isExpanded && <span>Logout</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;