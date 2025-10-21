import { Roboto } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Dashboard",
  description: "Control panel for Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
