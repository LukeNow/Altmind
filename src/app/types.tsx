
export interface AltEntry {
    color: string;
    key: string;
}

export interface EntryState {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;

    
    altEntries: AltEntry[];
  }
  
export interface UserState {
    id: string;
    name: string;
}

export interface GlobalContextType {
    globalEntries: EntryState[];
    displayedEntry: EntryState;
    user: UserState;
    createGlobalEntry: () => EntryState;
    setDisplayedEntry: (value: React.SetStateAction<EntryState>) => void;
    deleteGlobalEntry: (id: string) => void;
    showGlobalEntry: (id: string) => void;
    updateGlobalEntry: (entry: EntryState) => EntryState;
}

export interface APIEndpoint {
  url: string;
  method: string;
  body?: string;
}

export const APIInterface : APIEndpoint[]= [
  { url: "/api/entry/add",
    method: "POST",
    body: ""},
  {
    url: "/api/entry/delete",
    method: "DELETE",
    body: "entryID"
  },
  {
    url: "/api/entry/update",
    method: "PUT",
    body: "EntryState"
  },
  {
    url: "/api/entry/get",
    method: "GET",
    body: "entryID"
  },
  {
    url: "/api/user/add",
    method: "POST",
    body: ""
  },
  {
    url: "/api/user/delete",
    method: "DELETE",
    body: "UserID"
  },
  {
    url: "/api/user/update",
    method: "PUT",
    body: ""
  },
  {
    url: "/api/user/get",
    method: "GET",
    body: ""
  }
]

export const formIdProp = "main-form";

export const defaultUser: UserState = {
  id: 'Luke',
  name: 'Luke'
};

export const defaultEntry: EntryState = {
  id: '0',
  title: 'Welcome to altyMind!',
  content: 'This is a new entry',
  authorId: '1234',
  createdAt: new Date(),
  updatedAt: new Date(),
};