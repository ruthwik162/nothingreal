import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { Analytics } from "@vercel/analytics/next"
import Preloader from "./Components/Preloader";


export const metadata = {
  title: "Nothing Real",
  description: "We turn your NOTHING complexity vision into REAL revolutionary ideas feels inevitable",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Preloader/>
        <Navbar />
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
