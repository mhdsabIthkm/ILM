import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider, LoggedInUser } from '@/context/UserContext';
import { cookies } from 'next/headers';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialUser: LoggedInUser | null = null;
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('ilm_session')?.value;
    if (sessionCookie) {
      initialUser = JSON.parse(decodeURIComponent(sessionCookie));
    }
  } catch {}

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <UserProvider initialUser={initialUser}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
