import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suporte LRF",
  description: "Tire dúvidas e aprenda a usar o site LRF · Análise Financeira do Magistério.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
