import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import FloatingActionButton from "@/components/FloatingActionButton";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sajan Sharma - Full Stack Developer",
  description: "Sajan Sharma is a full stack developer",
  viewport: "width=device-width,initial-scale=1",
};

interface IProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<IProps> = ({ children }) => {
  return (
    <html lang="en" className="bg-gray-100 relative">
      <body className={poppins.className}>
        {children}
        <FloatingActionButton />
      </body>
    </html>
  );
};

RootLayout.displayName = "App:RootLayout";

export default RootLayout;
