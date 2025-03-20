"use client";

import React from "react";
import useOAuth from "@/hooks/useOAuth";

const DataFetchButton = () => {
  const { requestAuthCode, loading } = useOAuth();

  return (
    <button
      onClick={requestAuthCode}
      disabled={loading}
      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "처리 중..." : "인증 코드 요청"}
    </button>
  );
};

export default DataFetchButton;
