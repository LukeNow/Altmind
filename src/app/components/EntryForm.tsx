'use client';
import React from "react";
import DisableButton from './DisableButton';
import toast from 'react-hot-toast';
import { useForm , SubmitHandler } from "react-hook-form"
import { formHandlerAction } from "./FormHandler"
import SubmitButton from "./SubmitButton"
import { useState } from 'react';
import { useEffect } from 'react';
import { GlobalContext , useGlobalContext } from '../GlobalContext';
import { EntryState, GlobalContextType, formIdProp } from "../types"

export function EntryForm(){

  const context = useGlobalContext();

  const [disabled, setDisabled] = useState(false);

  const {
    register,
    unregister,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EntryState>({disabled, defaultValues: context.displayedEntry})
  
  
  const onSubmit = (entry: EntryState) => {
    console.log("Submitting entry=" + entry.content);

    context.updateGlobalEntry(entry);
    toast.success("Entry submited");
  
  }

  useEffect(() => {
      setValue('content', context.displayedEntry.content);
      setValue('title', context.displayedEntry.title);
  }, [context.displayedEntry]);


    return (
      <div> 
      <form id={formIdProp} onSubmit={handleSubmit(onSubmit)}>
        <SubmitButton/>
         <input 
            type="text" 
            {...register('title')}
            className="p-2 rounded-md text-gray-900"
          />
         <textarea {...register('content')}
          className="w-screen h-screen p-2 rounded-md \
                      text-gray-900"/>

        <button onClick={ () => { 
              if (!disabled) {
                  setDisabled(true);
                  console.log("Content disabled");
              } else {
                  setDisabled(false);
                  console.log("Content enabled");
              }
            } 
          }
      className="bg-blue-500 py-2 px-4 rounded-md w-full hover:bg-blue-700">
        {disabled ? 'Click to enable' : 'Click to disable'}
        </button>
      </form>  

      </div>
    );
  }


//<div style={combinedStyles}>{entry.content}</div>