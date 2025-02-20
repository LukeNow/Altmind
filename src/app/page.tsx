"use client";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { EntryForm } from "./components/EntryForm";
import { EntryState } from "./types";
import { useContext } from 'react';
import { GlobalContext , useGlobalContext } from './GlobalContext';


export default function Home() {

  const context = useGlobalContext();
  
  useEffect(() => {
    console.log("Number of entries is=" + context.globalEntries.length.toString());
  }, []);
  const setEntry = (entry : EntryState) => {
    //context.addGlobalEntry(entry);
    console.log("client state changed:" + context.globalEntries[0].content);
  };

  return (
    <div>
        <div className="flex w-screen">
          <EntryForm/>
        </div>
    </div>
  );
}
