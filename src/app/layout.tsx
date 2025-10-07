// app/layout.tsx
import { LanguageProvider } from '@/lib/il8n/provider';
import './globals.css';
import type { Metadata } from 'next';
import BottomNav from '@/components/BottomNav';
import { WizardProvider } from '@/components/wizard/WizardContext';
import { MapTileProvider } from '@/lib/MapTileContext';

export const metadata: Metadata = {
  title: 'ICE Tea Watch',
  description: 'Report and track ICE and law enforcement presence anonymously.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-900 text-white">
        <WizardProvider>
          <LanguageProvider>
            <MapTileProvider>
              {/* MAIN PAGE CONTENT */}
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-1 rounded flex items-center justify-between mb-2">
                <span>
                  We’re moving! ICE Tea Watch is now available at{' '}
                  <strong>watch.alwaysreadytools.org</strong>. Please update your bookmarks.
                </span>
                <a
                  href="https://watch.alwaysreadytools.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 px-4 py-2 bg-yellow-400 text-yellow-900 rounded font-semibold hover:bg-yellow-300 transition"
                >
                  Go to New Site
                </a>
              </div>
              <div className="max-w-4xl mx-auto p-4 min-h-screen pb-24">{children}</div>

              {/* FIXED BOTTOM NAVBAR - keep outside main */}
              <BottomNav />
            </MapTileProvider>
          </LanguageProvider>
        </WizardProvider>
      </body>
    </html>
  );
}
