"use client"
import React from "react";
import HomePage from "./components/pages/HomePage";
import { store } from '@/app/store/store'
import { Provider } from 'react-redux'

export default function Home() {
  
  return (
    <Provider store={store}>
      <div className="p-4">
        <HomePage />
      </div>
    </Provider>
  );
}
