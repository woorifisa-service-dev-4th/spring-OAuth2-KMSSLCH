"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">대시보드</h1>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <p className="text-xl text-gray-700 dark:text-gray-300">
                환영합니다, <span className="font-semibold">{session.user?.name || "사용자"}</span>님
              </p>
              <div className="mt-8">
                <button 
                  onClick={() => router.push("/")}
                  className="px-4 py-2  bg-indigo-600 hover:bg-indigo-200 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  홈으로 이동
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}