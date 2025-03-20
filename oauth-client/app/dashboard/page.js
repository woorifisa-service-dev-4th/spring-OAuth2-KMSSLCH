"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>로딩 중...</p>;
  if (!session) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div>
      <h1>대시보드</h1>
      <p>환영합니다, {session.user?.name || "사용자"}님</p>
      <button onClick={() => router.push("/")}>홈으로 이동</button>
    </div>
  );
}