import Navbar from "../components/Navbar";
import "./globals.css";

import { Inter } from "next/font/google";
// import Provider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VMACE | Enrollment Form",
  description: "Enrollment form for VMACE",
};

export default async function RootLayout({
  children
}) {
  
  return (
    <html lang="en">
      
      <body className={inter.className}>
        {/* <Provider > */}
          <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
            <Navbar />
            {children}
          </div>
        {/* </Provider> */}
      </body>
    </html>
  );
}
