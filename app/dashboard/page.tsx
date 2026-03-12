"use client";

import SearchBox from "./components/Main";
import UserBussiness from "./components/userBussiness";
import ListedStore from "./findstore/ListedStore";

export default function Dashboard() {
  
  return (
    <div className="w-full max-w-6xl">
      <SearchBox />
      <div className="h-screen">

        <ListedStore />
        
        <UserBussiness/>
      </div>
    </div>
  );
}
