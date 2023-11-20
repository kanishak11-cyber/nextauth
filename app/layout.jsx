import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/context/AuthContext";

const inter = Poppins({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata = {
  title: "VMACE || Enrollment ",
  description: "VMACE Enrollment System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
         
          <main className="px-28 min-h-screen mx-auto py-2">
             <Navbar />
            {children}</main>
        </Provider>
      </body>
    </html>
  );
}
