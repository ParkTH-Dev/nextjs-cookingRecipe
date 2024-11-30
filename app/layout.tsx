import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "맛있는 레시피 앱",
  description: "간단한 레시피 모음",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
