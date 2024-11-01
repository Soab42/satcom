import SideBar from "@/components/nav/Nav";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import TopBar from "@/components/nav/TopBar";
import Link from "next/link";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <ReduxProvider>
          <div className="flex h-screen w-[100vw] overflow-hidden">
            <SideBar />
            <main className="w-full flex flex-col justify-between">
              <TopBar />
              <div className="p-2 h-full">
                {children}
                {modal}
              </div>
              <footer className="text-right pr-10 border-t p-4 capitalize">
                made by{" "}
                <Link href="https://github.com/soab42" target="_blank">
                  @soab42
                </Link>
              </footer>
            </main>{" "}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
