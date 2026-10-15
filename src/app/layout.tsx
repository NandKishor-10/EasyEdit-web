import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Quicksand } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "AI photo editor for Android. Edit with prompts, remove backgrounds, expand images, enhance quality and apply AI styles, plus crop, filters, text and markup.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: AI Photo Editor for Android`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  keywords: [
    "AI photo editor",
    "photo editor app",
    "remove background",
    "AI image expand",
    "photo enhancer",
    "AI filters",
    "edit photo with prompt",
    "Android photo editor",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME}: AI Photo Editor for Android`,
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}: AI Photo Editor for Android`,
    description,
  },
  // app/favicon.ico is picked up automatically; the big icon covers home-screen / touch icons.
  icons: { apple: "/EasyEdit-web/icon.png" },
  robots: { index: true, follow: true },
  category: "photography",
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0d" },
    { media: "(prefers-color-scheme: light)", color: "#f3f3ef" },
  ],
};

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className={`${quicksand.variable} min-h-dvh overflow-x-clip antialiased`}>{children}</body>
    </html>
  );
}
