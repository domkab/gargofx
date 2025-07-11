import "./globals.css";
import "./globals.scss";
import ReduxProvider from '@/redux/ReduxProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NavigationLoader from './components/Navigation/NavigationLoader';
import PageViewTracker from './components/Tracking/PageViewTracker';
import GA from './components/Tracking/GA';
import CookieBannerToggle from './components/Tracking/CookieBannerToggle';
import ThemeComponent from './components/ThemeComponent';
import { layoutMetadata } from '@/lib/metadata/layout';

export const metadata = layoutMetadata;

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
  const bodyClassName = `${geistSans.variable} ${geistMono.variable} antialiased${useThemeFlag ? ' ' : ' background'}`;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={bodyClassName}>
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