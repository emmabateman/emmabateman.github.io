'use client';

import { StrictMode } from "react";
import { CookiesProvider } from "react-cookie";
import { Navbar } from "../components/navbar";
import { BootstrapClient } from "../components/bootstrap_client";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StrictMode>
      <CookiesProvider>
        <html lang="en">
          <body>
            <Navbar />
            <div className="container text-center px-5 mb-5">{children}</div>
            <BootstrapClient />
          </body>
        </html>
      </CookiesProvider>
    </StrictMode>
  );
}
