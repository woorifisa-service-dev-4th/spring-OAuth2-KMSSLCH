"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useOAuth from "@/hooks/useOAuth";

const CallbackPage = () => {
  const { authCode } = useOAuth();
  const router = useRouter();

  useEffect(() => {
    if (authCode) {
      router.push("/");
    }
  }, [authCode, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-bold">OAuth 처리 중...</h1>
    </div>
  );
};

export default CallbackPage;
