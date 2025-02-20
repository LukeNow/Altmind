'use client';

import React, { use } from 'react';
import { useEffect, useRef } from 'react';
import { createContext, useState, useContext } from 'react';
import { EntryState , UserState, GlobalContextType, formIdProp, APIEndpoint, APIInterface} from './types';
import { nanoid } from 'nanoid';
import { getUser, addUser , getEntries, addEntry, updateEntry, deleteEntry } from '@/lib/api';
import { defaultEntry, defaultUser } from './types';
import { set } from 'react-hook-form';

const GlobalEntriesState : GlobalContextType = {
    globalEntries: [],
    user: defaultUser,
    createGlobalEntry: () => Object.create(null),
    displayedEntry: Object.create(null),
    setDisplayedEntry: () => {},
    deleteGlobalEntry: () => {},
    showGlobalEntry: () => {},
    updateGlobalEntry: () => Object.create(null),
};

export const GlobalContext = createContext<GlobalContextType>(GlobalEntriesState);

export const GlobalProvider = ({ children }) => {
    const [globalEntries, setGlobalEntries] = useState<EntryState[]>([]); // Example of global state

    const [globalUser, setGlobalUser] = useState<UserState>(defaultUser)

    const [ displayedEntry, setDisplayedEntry ] = useState<EntryState>(Object.create(null));

    const [ loggedIn, setLoggedIn ] = useState<boolean>(false);

    const createDefaultEntry = (entry: EntryState) => {
      entry.title = defaultEntry.title;
      entry.content = defaultEntry.content;
    }

    const findEntry = (id: string) => {

      console.log("Finding entry with id=" + id);
      const found = globalEntries.find((entry) => entry.id === id);
      if (found == undefined) {
        throw new Error("Could not find entry with id=" + id);
      }

      return found;
    }
    
    const addGlobalEntry = (entry: EntryState) => {

        console.log("Adding entry with id=" + entry.id);
        if (entry.id === '0' || entry.id === '') {
          throw new Error("Id is the default id code");
        }

        setGlobalEntries([entry, ...globalEntries]);
    }
  
    const createGlobalEntry = () => {

      addEntry(globalUser.id).then((fetchedEntry) => {
        console.log("Creating entry with id=" + fetchedEntry.id);
        addGlobalEntry(fetchedEntry);
        return fetchedEntry;
      }).catch((error) => {
        throw new Error("Could not create new entry");
      });

      return defaultEntry;
    }

    const updateGlobalEntry = (entry : EntryState) => {
      
      console.log("Updating entry with id=" + entry.id);
      console.log("Currently Displayed Entry: " + displayedEntry.id);

      let updatedEntry = displayedEntry;
      updatedEntry.title = entry.title;
      updatedEntry.content = entry.content;

      updateEntry(globalUser.id, updatedEntry).then((fetchedEntry) => {
          console.log("Updating entry with id=" + fetchedEntry.id);
          let entryArray = globalEntries.map((entry) => entry.id === fetchedEntry.id ? fetchedEntry : entry);
          setGlobalEntries(entryArray);
      });
    }
   
    const deleteGlobalEntry = (entryId: string) => {
      console.log("Deleting entry with id=" + entryId);
      
      deleteEntry(globalUser.id, entryId).then(() => {
        const entryArray = globalEntries.filter((entry) => entry.id !== entryId);
        setGlobalEntries(entryArray);
      }).catch((error) => {
        throw new Error("Could not delete entry with id=" + entryId);
      });

      setDisplayedEntry(globalEntries[0]);
    }

    const showGlobalEntry = (entryId : string) => {
      if (entryId === '0') {
          throw new Error("Id is the default id code");
      }
      
      console.log("Showing entry with id=" + entryId);
      let found = findEntry(entryId);

      setDisplayedEntry(found);
    }

    const initUser = async () => {
      let user = defaultUser;

      console.log("Performing Client user init");
      let fetchedUser : UserState = await getUser(user.id);
      if (fetchedUser.id === 'NULL') {
        
        console.log("User not found creating new user");
        fetchedUser = await addUser(user.name);

        if (fetchedUser.id === 'NULL') {
          throw new Error("Could not create new user");
        }

        setGlobalUser(fetchedUser);
        console.log("User created with id=" + fetchedUser.id);

      } else {
        setGlobalUser(fetchedUser);
        console.log("User found with id=" + fetchedUser.id);
      }

      return fetchedUser.id;
    }

    const initEntries = async  (userId : string) => {
      console.log("Performing Client entry init");
      console.log("With globalUser.id=" + userId);


      let entry = defaultEntry;

      let entries = await getEntries(userId);

      if (entries.length === 0) {
        console.log("No entries found creating new entry");
        const fetchedEntry = await addEntry(userId);
        if (fetchedEntry === undefined) {
          throw new Error("Could not create new entry");
        }

        addGlobalEntry(fetchedEntry);
        console.log("Created default entry with id=" + fetchedEntry.id);
      } else {
        setGlobalEntries(entries);
      }

      setLoggedIn(true);
    }


    // Initialize the first Entry and set is as the displayed entry
    useEffect(() => {
      initUser().then((userId) => {

        initEntries(userId);
      })

    }, []);

    useEffect(() => {
      if (globalEntries.length === 0) {
        setDisplayedEntry(defaultEntry);
      }
    }, [globalEntries.length]);
         
    return (
      <GlobalContext.Provider value={
        { globalEntries, displayedEntry, globalUser, createGlobalEntry, 
        setDisplayedEntry, deleteGlobalEntry, showGlobalEntry, updateGlobalEntry }}>
        {children}
      </GlobalContext.Provider>
    );
  };
  
  // 3. Custom hook to use the context
  export const useGlobalContext = () => {
    return useContext(GlobalContext);
  };
