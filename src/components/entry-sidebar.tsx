"use client";

import { format } from 'date-fns' 
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { Calendar, Home, Inbox, Search, Settings, Plus, ListCollapse, MoreHorizontal} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSub,
  SidebarMenuAction,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"



import Link from 'next/link';

export const entryItem = {
    title: "Entries",
    url: "#",
    icon: Plus,
}

import { EntryState } from "@/app/types"
import { useContext, useState } from 'react';
import { GlobalContext , useGlobalContext } from '@/app/GlobalContext';


function EntrySubItem({ entry } : { entry: EntryState }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

    const context = useGlobalContext();

    const newEntryClick = () => {
      let entry = context.createGlobalEntry();
      context.setDisplayedEntry(entry);
    }

    const setEntryClick = (entry : EntryState) => {
      console.log("Displaying entry with id=" + entry.id);
      context.setDisplayedEntry(entry);
    }

    const deleteEntryClick = (entry: EntryState) => {
      context.deleteGlobalEntry(entry.id);
    }

    const saveEntryClick = (entry: EntryState) => {
      context.updateGlobalEntry(entry);
    }

  return (
    <div>
    <SidebarMenuItem>
  <SidebarMenuButton asChild>
    { context.displayedEntry.id === entry.id ? 
      <span className={"bold"} onClick={()=> {setEntryClick(entry)}}>{entry.title} </span>
      :  <span onClick={()=> {setEntryClick(entry)}}>{entry.title} </span> }
  </SidebarMenuButton>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <SidebarMenuAction>
        <MoreHorizontal />
      </SidebarMenuAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start">
      <DropdownMenuItem>
        <span onClick={()=>{deleteEntryClick(entry)}}>Delete Entry</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span> Updated on: {format(entry.updatedAt, 'MMMM Do, yyyy H:mma')}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</SidebarMenuItem>
  </div>
  );
}

export function EntrySidebar() {
    const context = useGlobalContext();

       return (
                            
        <div>  

          {context.globalEntries.map((entry : EntryState) => (

          <EntrySubItem key={entry.id} entry={entry} />
                       ))}
          
            </div>
            )

}