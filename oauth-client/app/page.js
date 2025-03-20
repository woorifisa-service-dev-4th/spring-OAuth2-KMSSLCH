"use client";
import { useSession } from "./context/SessionProvider";

export default function Home() {
  const { session, loading } = useSession();

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>OAuth 2.0 로그인</h1>
      {session?.user ? (
        <div>
          <p>로그인됨: {session.user.name || "사용자"}</p>
          <button onClick={() => (window.location.href = "/api/auth/signout")}>
            로그아웃
          </button>
        </div>
      ) : (
        <button onClick={() => (window.location.href = "/api/auth/signin?provider=custom-oauth")}>
          로그인
        </button>
      )}
    </div>
  );
}
