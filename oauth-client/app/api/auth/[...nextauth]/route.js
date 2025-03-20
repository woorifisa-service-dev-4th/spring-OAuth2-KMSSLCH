// app/api/auth/[...auth]/route.js
import NextAuth from "next-auth";
import { authOptions } from "@/auth"; // auth.js에서 내보낸 옵션

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };