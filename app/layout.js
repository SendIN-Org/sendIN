// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Header from './header';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "sendIN",
  description: "Send money from the US to India in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
