import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intellectuals",
  description: "For the elite crossworders and connectionists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          {children}
          <footer className="footer footer-center p-4 bg-base-300 text-base-content absolute bottom-0 w-full">
            <aside>
              <p>Copyright © 2024 - All rights reserved by The High Council Of Intellectuals - Made with &#x1F499; by Rohan</p>
            </aside>
          </footer>
        </body>
      </UserProvider>
    </html>
  );
}
