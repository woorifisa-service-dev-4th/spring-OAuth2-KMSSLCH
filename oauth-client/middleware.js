import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", req.url)); // 인증되지 않은 경우 로그인 페이지로 리디렉션
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware auth error:", error);
    return NextResponse.next(); // 오류 발생 시 계속 진행
  }
}

export const config = {
  matcher: ["/protected-route/:path*", "/dashboard"], // 보호할 경로 추가
};