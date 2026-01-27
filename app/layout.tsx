import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { AuthProvider } from "./context/AuthContext";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prueba TDP",
  description: "Creado por Kevin March",
  icons: {
    icon: "/movie.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-base-100 text-base-content">
        <AuthProvider>
          <Navbar />
          <main>
            <div className="px-8 mx-auto">{children}</div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
