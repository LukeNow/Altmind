'use server';

import { EntryState, ServerState } from "../types"

export const formHandlerAction = async (
  entry: EntryState
): Promise<EntryState> => {

    console.log("received data=" + entry.content);
    //const validated = true;

    return { content: 'Submitted content!', title:'Submitted tile', id: '1234'};

};