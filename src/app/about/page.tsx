'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { GlobalContext , useGlobalContext } from '../GlobalContext';
import { EntryState, GlobalContextType } from "../types"

export default function Page() {

    const context = useGlobalContext();

    useEffect(() => {
    // Your function to execute
        console.log('Page loaded!');

       // Router.push('/');
  }, []); 


    const handleClick = (entry: EntryState) => {
        context.setDisplayedEntry(entry);
        console.log("HANDLED DA CLICK");
        console.log("Set display to id=" + entry.id);
    };

    return (
    <div>
        <h1> Click the entry to set it as the currently displayed entry</h1>
        <ul>
        {
            context.globalEntries.length !== 0 ?
        
            context.globalEntries.map((entry) => (
            <li key={entry.id}>
                <h3> entryID = {entry.id}</h3>
                <p onClick={() => handleClick(entry)}>Content: {entry.content}</p>

            </li>
            ))
        
        : <p>There are no entries</p> }
        </ul>
   
        <Link href="/">Create page, click to return</Link>
    </div>
    );
 }