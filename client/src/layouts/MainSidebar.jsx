import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function MainSidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full md:w-screen">
      <div className="block md:hidden">
        <SidebarTrigger />
      </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default MainSidebar;
