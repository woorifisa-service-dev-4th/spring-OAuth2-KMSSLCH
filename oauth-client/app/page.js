"use client";
import { useSession } from "./context/SessionProvider";
import Link from "next/link";

export default function Home() {
  const { session, loading } = useSession();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            OAuth 2.0 로그인 예제
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Next.js와 NextAuth.js를 사용한 OAuth 인증 샘플
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {session?.user ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "사용자"}
                      className="h-24 w-24 rounded-full mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    환영합니다, {session.user.name || "사용자"}님
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {session.user.email || "이메일 정보 없음"}
                  </p>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Link 
                    href="/dashboard"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    대시보드로 이동
                  </Link>
                  
                  <button 
                    onClick={() => (window.location.href = "/api/auth/signout")}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center text-gray-600 dark:text-gray-400">
                  로그인하여 서비스를 이용하세요
                </div>
                
                <div className="flex flex-col space-y-3">
                  <button 
                    onClick={() => (window.location.href = "/api/auth/signin?provider=custom-oauth")}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-indigo-600 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    OAuth 로그인
                  </button>
                  
                  {/* <Link 
                    href="/auth/login"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    로그인 페이지로 이동
                  </Link> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}