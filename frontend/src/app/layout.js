import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import FloatingContact from "../components/common/FloatingContact";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lavi Adventure",
  description: "YOUR ADVENTURE, OUR EXPERTISE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
          <FloatingContact/>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
