import React from "react";
import DashboardSidebar from "../AdminPannel/DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardHomePage from "./DashboardHomePage";
import { Outlet } from "react-router-dom";

const DashboardMainPage = () => {
  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-[18%] shadow h-full border border-black/10">
        <DashboardSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-white">
        <DashboardHeader />
        <div className="p-4">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainPage;
