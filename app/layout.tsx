import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@/context/UserContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MDIA ILM — Malik Deenar Islamic Academy',
  description: 'Integrated Learning Program Meeting Management and Speech Evaluation',
  keywords: ['ILM', 'Islamic Academy', 'Toastmasters', 'Speech Evaluation', 'Meeting Management'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
