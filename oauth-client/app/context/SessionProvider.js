"use client";

import { SessionProvider as NextAuthSessionProvider, useSession as nextAuthUseSession } from "next-auth/react";

export function SessionProvider({ children, session }) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
}

export const useSession = nextAuthUseSession;