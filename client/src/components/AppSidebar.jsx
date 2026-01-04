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
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

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
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to logout");

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Sidebar>
      <SidebarGroup>
        <SidebarGroupLabel>Postflowly</SidebarGroupLabel>
        <SidebarGroupContent className="flex flex-col gap-8">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton>
                  <NavLink
                    to={item.url}
                    end={false}
                    className={({ isActive }) =>
                      `w-full font-inter ${
                        isActive
                          ? "text-green-600 w-full font-bold"
                          : "text-inherit w-full"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarMenu>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="flex justify-start pl-2 bg-inherit text-black font-normal
                    cursor-pointer font-inter hover:bg-neutral-100"
                >
                  Logout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-inter mt-6">Are you sure you want to logout?</DialogTitle>
                  <DialogDescription className="sr-only" />
                </DialogHeader>
                <div className="flex justify-end">
                  <Button onClick={handleLogout} className="font-inter w-25 cursor-pointer">Yes</Button>
                </div>
              </DialogContent>
            </Dialog>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
}

export default AppSidebar;
