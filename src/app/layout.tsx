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
  title: "Capitronix | Next-Gen Launchpad & Community Growth Engine",
  description:
    "The first protocol where community growth meets token innovation. Join Capitronix to access exclusive presales and earn through our advanced network marketing system.",
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
  authors: [{ name: "Capitronix Team", url: "https://capitronix.com" }],
  creator: "Capitronix Team",
  publisher: "Capitronix",
  openGraph: {
    title: "Capitronix | Next-Gen Launchpad & Community Growth Engine",
    description:
      "The first protocol where community growth meets token innovation. Join Capitronix to access exclusive presales and earn through our advanced network marketing system.",
    url: "https://capitronix.com",
    siteName: "Capitronix",
    images: [
      {
        url: "https://capitronix.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Capitronix - Digital Currency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capitronix | Next-Gen Launchpad & Community Growth Engine",
    description:
      "The first protocol where community growth meets token innovation. Join Capitronix to access exclusive presales and earn through our advanced network marketing system.",
    site: "@Capitronix",
    creator: "@Capitronix",
    images: ["https://capitronix.com/og-image.jpg"],
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
    icon: "https://capitronix.com/favicon.ico",
    shortcut: "https://capitronix.com/favicon-32x32.png",
    apple: "https://capitronix.com/apple-touch-icon.png",
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
        <link rel="canonical" href="https://capitronix.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Capitronix",
              url: "https://capitronix.com",
              logo: "https://capitronix.com/logo.png",
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
