// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";
// import Dashboard from "@/components/Dashboard";
// import Swimlane from "@/components/Swimlane";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function Home() {
//   return (
//     <main className={`${geistSans.variable} ${geistMono.variable} font-sans`}>

//       <Dashboard />
//     </main>
//   );
// }

import React, { useState, useEffect, useCallback } from 'react';
import { useTaskStore } from '@/state/taskStore';
import Sidebar from '@/layout/Sidebar';
import TopHeader from '@/layout/TopHeader';
import ProjectSection from '@/layout/ProjectSection';
import Dashboard from '@/components/Dashboard';

interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

export default function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const { searchQuery, setSearchQuery } = useTaskStore();

  // Breakpoints
  const BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  };

  // Responsive handling
  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const newIsMobile = width < BREAKPOINTS.mobile;
    const newIsTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;

    setIsMobile(newIsMobile);
    setIsTablet(newIsTablet);

    // Auto-collapse sidebar on mobile and tablet
    if (newIsMobile) {
      setSidebarExpanded(false);
    } else if (newIsTablet) {
      setSidebarExpanded(false);
    } else {
      // Auto-expand on desktop if it was collapsed due to mobile
      setSidebarExpanded(true);
    }
  }, []);

  // Debounced resize handler for better performance
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;

    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    // Initial check
    handleResize();
    setMounted(true);

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  // Enhanced notification handler
  const handleNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setNotification({ message, type, id });

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle sidebar toggle with proper state management
  const handleSidebarToggle = useCallback(() => {
    setSidebarExpanded(prev => !prev);
  }, []);

  // Prevent hydration issues
  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Notification styles based on type
  const getNotificationStyles = (type: string) => {
    const baseStyles = "fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-white font-medium min-w-[200px] max-w-[400px] transition-all duration-300 ease-in-out transform";

    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-500`;
      case 'error':
        return `${baseStyles} bg-red-500`;
      case 'info':
        return `${baseStyles} bg-blue-500`;
      default:
        return `${baseStyles} bg-gray-500`;
    }
  };

  return (
    <>
      {/* Global Styles for Cross-Browser Compatibility */}
      <style jsx global>{`
        /* Reset and base styles for cross-browser compatibility */
        * {
          box-sizing: border-box;
        }
        
        html {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        body {
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Animation keyframes */
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        /* Responsive utilities */
        .touch-scroll {
          -webkit-overflow-scrolling: touch;
        }
        
        /* Focus styles for accessibility */
        .focus-visible:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>

      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Success/Error Notification */}
        {notification && (
          <div
            className={`${getNotificationStyles(notification.type)} animate-slide-in-right`}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${notification.type === 'success' ? 'bg-green-200' :
                  notification.type === 'error' ? 'bg-red-200' : 'bg-blue-200'
                }`}></div>
              <span className="text-sm md:text-base">{notification.message}</span>
            </div>
          </div>
        )}

        {/* Mobile Overlay for Sidebar */}
        {isMobile && sidebarExpanded && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={handleSidebarToggle}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'}
          ${sidebarExpanded ? 'translate-x-0' : isMobile ? '-translate-x-full' : ''}
          transition-transform duration-300 ease-in-out
        `}>
          <Sidebar
            isExpanded={sidebarExpanded}
            onToggle={handleSidebarToggle}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>

        {/* Main Content */}
        <div className={`
          flex-1 flex flex-col overflow-hidden min-w-0
          ${!isMobile && sidebarExpanded ? 'ml-0' : ''}
          transition-all duration-300 ease-in-out
        `}>
          {/* Top Header */}
          <div className="flex-shrink-0">
            <TopHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSidebarToggle={handleSidebarToggle}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </div>

          {/* Project Section */}
          <div className="flex-shrink-0">
            <ProjectSection
              className={`${isMobile ? 'px-3 py-4' : isTablet ? 'px-4 py-5' : 'px-6 py-6'}`}
            />
          </div>

          {/* Dashboard - Scrollable Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto touch-scroll">
              <Dashboard
                onNotification={handleNotification}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};