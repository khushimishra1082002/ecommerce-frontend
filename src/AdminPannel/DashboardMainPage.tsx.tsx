import React from "react";
import DashboardSidebar from "../AdminPannel/DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardHomePage from "./DashboardHomePage";
import { Outlet } from "react-router-dom";

const DashboardMainPage = () => {
  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-[18%] shadow border border-black/10 h-[100vh] overflow-y-auto">
        <DashboardSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-white h-[100vh]">
        <div className="h-[10vh]">
          <DashboardHeader />
        </div>
        <div className="p-4 h-[90vh] overflow-y-auto">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainPage;
