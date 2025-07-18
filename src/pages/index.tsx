import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Board App</h1>
        <p className="text-lg text-gray-700 mb-8">
          This is a simple board application built with Next.js and Ant Design.
        </p>
        <Image
          src="/images/board.png"
          alt="Board App Screenshot"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
    </main>
  );
}
