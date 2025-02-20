'use client';
import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { UseFormRegister, UseFormUnregister } from 'react-hook-form';
import { EntryState } from '../types'

export default function DisableButton(registerProp: UseFormRegister<EntryState>, 
                                      unregisterProp: UseFormUnregister<EntryState>) {
 // const { pending, data, method, action } = useFormStatus();
    const [disabled , setDisabled ] = useState(false);
    
  return (
    <button onClick={
        () => { 
            if (!disabled) {
                setDisabled(true);
                unregisterProp('content');
            } else {
                setDisabled(false);
                registerProp('content');
            }
        } 
     }
      className="button-8">
        {disabled ? 'Click to enable' : 'Click to disable'}
    </button>
  );
}