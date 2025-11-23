import { Roboto } from "next/font/google";
import "./globals.css";
import "mingcute_icon/font/Mingcute.css";
import "react-responsive-modal/styles.css";
import { ClientProviders } from "@/components/ClientProviders";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "3Twenty Coin | The Future of Digital Currency",
  description:
    "3Twenty Coin delivers a fast, secure, and utility-driven digital currency experience designed for users, developers, and businesses, shaping the next generation of blockchain innovation.",
  keywords: [
    "3Twenty Coin",
    "3Twenty Ecosystem",
    "3TWENTY",
    "3TWENTY Token",
    "Crypto Presale",
    "Web3twenty",
    "Blockchain Ecosystem",
    "CryptoFuture",
  ],
  authors: [{ name: "3Twentycoin Team", url: "https://3twentycoin.com" }],
  creator: "3Twentycoin Team",
  publisher: "3Twentycoin",
  openGraph: {
    title: "3Twenty Coin | The Future of Digital Currency",
    description:
      "3Twenty Coin delivers a fast, secure, and utility-driven digital currency experience designed for users, developers, and businesses, shaping the next generation of blockchain innovation.",
    url: "https://3twentycoin.com",
    siteName: "3Twentycoin",
    images: [
      {
        url: "https://3twentycoin.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "3Twentycoin - Digital Currency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3Twenty Coin | The Future of Digital Currency",
    description:
      "3Twenty Coin delivers a fast, secure, and utility-driven digital currency experience designed for users, developers, and businesses, shaping the next generation of blockchain innovation.",
    site: "@3Twentycoin",
    creator: "@3Twentycoin",
    images: ["https://3twentycoin.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://3twentycoin.com/favicon.ico",
    shortcut: "https://3twentycoin.com/favicon-32x32.png",
    apple: "https://3twentycoin.com/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://3twentycoin.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "3Twentycoin",
              url: "https://3twentycoin.com",
              logo: "https://3twentycoin.com/logo.png",
            }),
          }}
        />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
