import React, { useState } from "react";
import DashboardSidebar from "../AdminPannel/DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { Outlet } from "react-router-dom";

const DashboardMainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          fixed md:relative z-40 top-0 left-0 h-full w-[70%] md:w-[18%]
          bg-white shadow border border-black/10 transition-transform duration-300 ease-in-out
          transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <DashboardSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed md:hidden inset-0 bg-black/30 z-30"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 bg-white h-full">
        <div className="h-[10vh]">
          <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
        </div>
        <div className="p-4 h-[90vh] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardMainPage;
