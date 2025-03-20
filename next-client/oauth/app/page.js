"use client";

import React from "react";
import DataFetchButton from "./components/DataFetchButton";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Woori-Dashboard</h1>
        <DataFetchButton />
      </div>
    </div>
  )
}

export default page