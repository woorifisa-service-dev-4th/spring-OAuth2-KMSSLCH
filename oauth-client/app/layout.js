"use client";

import { SessionProvider } from "./context/SessionProvider";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>OAuth 2.0 Client Demo</title>
        <meta name="description" content="Next.js와 NextAuth.js를 사용한 OAuth 2.0 인증 데모 애플리케이션" />
      </head>
      <body className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
        <SessionProvider>
          {/* <Header /> */}
          <main className="flex-grow">
            {children}
          </main>
          {/* <Footer /> */}
        </SessionProvider>
      </body>
    </html>
  );
}