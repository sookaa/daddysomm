import "./globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "daddysomm",
  description: "Wine, irreverently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
