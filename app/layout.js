// app/layout.js
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import ReduxProvider from "./ReduxProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "Gachpala",
  description: "Your plant marketplace",
};

// This component will only render on the client side
function ClientLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased dark-theme ${spaceGrotesk.variable}`}>
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}

// Server component wrapper
export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
