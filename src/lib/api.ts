import { UserState, EntryState } from "@/app/types";

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

async function apiCall(url: string, method: string, body: any) {
    console.log("Api call: ", url, method, body);
    
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const result = await response.json();
   

    return result;
}
    
export async function getUser (userId: string) : Promise<UserState> {
    const result = await apiCall('/api/user/get', 'POST', {userId: userId});

    const user : UserState = result.user ? {id: result.user.id, name: result.user.name} : {id: 'NULL', name: 'NULL'};

    return user;  
}

export async function addUser (name: string) : Promise<UserState> {

    const result = await apiCall('/api/user/add', 'POST', {name: name});

    const user: UserState = result.user ? {id: result.user.id, name: result.user.name} : {id: 'NULL', name: 'NULL'};
    
    return user;
}

export async function addEntry(userId: string): Promise<EntryState> {
    const result = await apiCall('/api/entry/add', 'POST', {userId: userId});
    console.log("addEntry result: ", result);

    return {id: result.entry.id, title: result.entry.title, content: result.entry.content, authorId: result.entry.authorId, createdAt: result.entry.createdAt, updatedAt: result.entry.updatedAt};
}

export async function deleteEntry(userId: string, entryId: string) {
    await apiCall('/api/entry/delete', 'POST', {userId: userId, entryId: entryId});
}

export async function updateEntry(userId: string, entry: EntryState): Promise<EntryState> {
    const result = await apiCall('/api/entry/update', 'POST', {userId: userId, entry: entry});
    console.log("updateEntry result: ", result);
    return {id: result.entry.id, title: result.entry.title, content: result.entry.content, authorId: result.entry.authorId, createdAt: result.entry.createdAt, updatedAt: result.entry.updatedAt};
}

export async function getEntry(userId: string, entryId: string): Promise<EntryState> {
    const result = await apiCall('/api/entry/get', 'POST', {userId: userId, entryId: entryId});
    console.log("getEntry result: ", result);
    return {id: result.entries.id, title: result.entries.title, content: result.entries.content, authorId: result.entries.authorId, createdAt: result.entries.createdAt, updatedAt: result.entries.updatedAt};
}

export async function getEntries(userId: string): Promise <EntryState[]> {
    const result = await apiCall('/api/entry/get', 'POST', {userId: userId});
    console.log("getEntries result: ", result);
    return result.entries.map((entry: any) => {
        return {id: entry.id, title: entry.title, content: entry.content, authorId: entry.authorId, createdAt: entry.createdAt, updatedAt: entry.updatedAt};
    });
}

export async function openAIRequest(prompt: string): Promise<string> {
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
            prompt: prompt,
            max_tokens: 100,
            }),
    });
        const data = await response.json();
        console.log("openAIRequest data: ", data);

        return data.choices[0].text;
    } catch (error) {
        console.error('Error:', error);
        return "";
    }
}
    
