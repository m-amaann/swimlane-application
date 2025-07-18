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

import React, { useState, useEffect } from 'react';
import { useTaskStore } from '@/state/taskStore';
import Sidebar from '@/layout/Sidebar';
import TopHeader from '@/layout/TopHeader';
import ProjectSection from '@/layout/ProjectSection';
import Dashboard from '@/components/Dashboard';

const Home: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const { searchQuery, setSearchQuery } = useTaskStore();

  // Responsive handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Notification handler
  const handleNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Success Notification */}
      {notification && (
        <div
          className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          style={{ animation: 'fadeIn 0.3s ease-in-out' }}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
          {notification}
        </div>
      )}

      {/* Sidebar */}
      <Sidebar
        isExpanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSidebarToggle={() => setSidebarExpanded(!sidebarExpanded)}
        />

        {/* Project Section */}
        <ProjectSection />

        {/* Dashboard */}
        <Dashboard onNotification={handleNotification} />
      </div>
    </div>
  );
};

export default Home;