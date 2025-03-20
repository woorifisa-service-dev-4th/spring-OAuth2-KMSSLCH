import { OAuthProvider } from "./context/OAuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <OAuthProvider>
          {children}
        </OAuthProvider>
      </body>
    </html>
  );
}
