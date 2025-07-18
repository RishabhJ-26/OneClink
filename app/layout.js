import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "OneClink – Share in a Blink, Flex What You Link",
  description:
    "From links you post to the things you boast — OneClink puts it all coast to coast.",
  icons: {
    icon: "/logo.png", // Path to your favicon in the public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] min-h-screen relative overflow-x-hidden text-white flex flex-col min-h-screen`}
      >
        {/* Neon animated background effect */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-[60vw] h-[60vw] bg-gradient-radial from-cyan-400/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-gradient-radial from-pink-500/20 via-blue-500/10 to-transparent rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div style={{ position: "fixed", zIndex: 9999, width: "100%", top: 0, left: 0 }}>
          <ToastContainer position="top-center" />
        </div>

        <Navbar className="z-40" />
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>

        <footer className="w-full text-center py-4 text-cyan-200 text-sm opacity-80 z-20 mt-auto">
          Made with <span className="text-pink-400">❤️</span> by&nbsp;
          <a
            href="https://www.linkedin.com/in/rishabh-jain-enris/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 font-semibold hover:underline hover:text-cyan-300 transition-colors"
          >
            Rishabh Jain
          </a>
        </footer>
      </body>
    </html>
  );
}
