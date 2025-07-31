import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Score App",
  description: "A music score editor in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/15.2.7/Tone.min.js" strategy="beforeInteractive"></script>
      <script src="/tonejs-instruments/SampleLibrary.js" strategy="beforeInteractive"></script>
    </html>
  );
}