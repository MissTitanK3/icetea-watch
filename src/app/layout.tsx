// app/layout.tsx
import { LanguageProvider } from '@/lib/il8n/provider';
import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'ICE Tea Watch',
  description: 'Report and track ICE and law enforcement presence anonymously.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-zinc-900 dark:text-white">
        <Analytics />
        <LanguageProvider>
          <main className="max-w-4xl mx-auto p-4">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
