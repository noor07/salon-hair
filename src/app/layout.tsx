import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import { ScrollLayout } from "@/components/ScrollLayout";
import { TOCIndicator } from "@/components/TOCIndicator";
import { BottomNav } from "@/components/BottomNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const frauncesSerif = Fraunces({
  variable: "--font-fraunces-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Los Domi Barbershop | Luxury Grooming",
  description: "High-end luxury salon and barbershop.",
  manifest: "/salon-hair/manifest.json",
  themeColor: "#c3a343",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Los Domi"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/salon-hair/sw.js').then(
                      function(registration) {
                        console.log('Service Worker registration successful with scope: ', registration.scope);
                      },
                      function(err) {
                        console.log('Service Worker registration failed: ', err);
                      }
                    );
                  });
                }
              `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${frauncesSerif.variable} antialiased font-sans text-alabaster bg-onyx relative min-h-screen`}
      >
        <div className="fixed inset-0 z-50 pointer-events-none opacity-40 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")` }}></div>
        <ScrollLayout>
          <TOCIndicator />
          <BottomNav />
          {children}
        </ScrollLayout>
      </body>
    </html>
  );
}
