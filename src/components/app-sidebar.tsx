"use client";
import { v4 as uuidv4 } from 'uuid';
import { Calendar, Home, Inbox, Search, Settings, Plus, ListCollapse, ListIcon } from "lucide-react"

import Color from "./color";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { EntryState, GlobalContextType } from "@/app/types"
import { useContext } from 'react';
import { GlobalContext , useGlobalContext } from '@/app/GlobalContext';
import { EntrySidebar } from "./entry-sidebar"
import Link from 'next/link';

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Items",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
 
export function AppSidebar() {

    const context = useGlobalContext();

    const newEntryClick = () => {
      let entry = context.createGlobalEntry();
      context.setDisplayedEntry(entry);
    }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Alt Mind</SidebarGroupLabel>
          <SidebarGroupContent>

            <SidebarMenu>
             <Collapsible className="group/collapsible">

              <SidebarMenuItem key="Entries">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                <a href='#'>
                    <ListCollapse />
                    <span>Entries</span>
                </a>
            </SidebarMenuButton>
            </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub key="New Item">
                        <Plus onClick={newEntryClick}/>
                    </SidebarMenuSub>
                    <SidebarMenuSub key={"Sub menu"}>
                      <EntrySidebar />
                          
                    </SidebarMenuSub>
             </CollapsibleContent>
    </SidebarMenuItem>

    <SidebarMenuItem key="New Color Item">
      <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                <a href='#'>
                    <ListCollapse />
                    <span>Colors</span>
                </a>
            </SidebarMenuButton>
            </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub key="New Color">
                        <Plus/>
                    </SidebarMenuSub>
                    <SidebarMenuSub key={"Color Sub menu"}>
                      
                          
                    </SidebarMenuSub>
             </CollapsibleContent>
    </SidebarMenuItem>
                                  
               </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}