'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '../app/utils/authcontext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if the current route is a dashboard route
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* Only show the default Navbar on non-dashboard routes */}
          {!isDashboardRoute && <Navbar />}

          {children}

          {/* Only show the Footer on non-dashboard routes */}
          {!isDashboardRoute && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}