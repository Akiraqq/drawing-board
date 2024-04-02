import { ReactNode, FC } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConvexClientProvider } from '@/providers/convex-client-provider';
import { Toaster } from '@/components/ui/sonner';
import { ModalProvider } from '@/providers';

interface Props {
  children: ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Drawing board',
  description: 'Drawing board',
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
