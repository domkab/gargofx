import "./globals.css";
import "./globals.scss";
import ReduxProvider from '@/redux/ReduxProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { Footer } from 'flowbite-react';
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Suspense } from 'react';
import BodyFontManager from './components/BodyFontManager';
import Header from './components/Header/Header';
import NavigationLoader from './components/Navigation/NavigationLoader';
import ThemeComponent from './components/ThemeComponent';
import CookieBannerToggle from './components/Tracking/CookieBannerToggle';
import GA from './components/Tracking/GA';
import PageViewTracker from './components/Tracking/PageViewTracker';
import { LayoutMetadata } from './metadata';
import SiteJsonLd from './SiteJsonLd';

export const metadata = LayoutMetadata;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const useThemeFlag = process.env.NEXT_PUBLIC_USE_THEME;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const bodyClassName = `
  ${inter.variable}
  ${geistSans.variable} 
  ${geistMono.variable} 
  antialiased${useThemeFlag ? ' ' : ' background'}
  `;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={bodyClassName}>
          <SiteJsonLd />
          <BodyFontManager />
          <ReduxProvider>
            <ThemeComponent>
              <div className="flex min-h-screen flex-col">
                <Suspense fallback={<div>Loading...</div>}>
                  <Header />
                </Suspense>
                <NavigationLoader />
                <PageViewTracker />
                <GA />
                <CookieBannerToggle />
                {children}
                <Footer />
              </div>
            </ThemeComponent>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}