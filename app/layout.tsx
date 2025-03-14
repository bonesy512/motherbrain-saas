import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { UserProvider } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Motherbrain - SaaS Solutions for New Developments',  // Updated to reflect SaaS focus
  description: 'Motherbrain provides innovative SaaS solutions for new developments, simplifying workflows and enhancing productivity.',
};
export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <Providers>
          <UserProvider userPromise={userPromise}>{children}</UserProvider>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
