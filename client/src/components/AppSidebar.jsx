import React from "react";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { NavLink } from "react-router-dom";

const items = [
  {
    title: "Home",
    url: "/home",
  },
  {
    title: "Story",
    url: "/story",
  },
];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarGroup>
        <SidebarGroupLabel>Postflowly</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton>
                  <NavLink
                    to={item.url}
                    end={false}
                    className={({isActive}) => `w-full ${isActive ? "text-blue-400 w-full font-bold" : "text-inherit w-full"}`}
                  >
                    {item.title}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
}

export default AppSidebar;
