import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "DIME Intelligence", description: "De datos operativos a decisiones gerenciales" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
