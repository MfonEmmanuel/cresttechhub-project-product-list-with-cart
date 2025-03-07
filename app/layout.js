import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Frontend Mentor: Product List with Cart",
  description: "Product list with cart challenge from Frontend Mentor",
  // image: "/images/og-image.png",
  // url: "https://product-list-with-cart.vercel.app/",
  // type: "website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
