'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, PlusCircle, ChevronLeft, SendHorizonal, ArrowRight } from 'lucide-react';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { useWizard } from './wizard/WizardContext';

export default function BottomNav() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const { step, back, next, canContinue, finish } = useWizard();
  // const router = useRouter();

  const isWizard = pathname.startsWith('/report/wizard');

  const handleNextOrFinish = () => {
    if (step === 2) {
      finish();
    } else {
      next();
    }
  };

  if (isWizard) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 shadow-md h-16 rounded-t-2xl">
        <div className="max-w-2xl mx-auto h-full flex justify-between items-center px-4">
          <button
            onClick={back}
            className={`flex items-center gap-1 text-sm pl-6 py-4 ${
              step === 0 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-100'
            }`}
            disabled={step === 0}>
            <ChevronLeft className="h-6 w-6" />
            {t('back')}
          </button>

          <Link href="/" className="relative -top-6 bg-blue-600 text-white p-4 rounded-full shadow-lg">
            <Home className="h-8 w-8" />
          </Link>

          <button
            onClick={handleNextOrFinish}
            className={`flex items-center gap-1 pr-2 pl-2 py-4 rounded-full shadow text-center justify-center ${
              canContinue ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!canContinue}>
            {step === 2 ? t('submit') : t('next')}
            {step === 2 ? <SendHorizonal className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 shadow-md h-16 rounded-t-2xl">
      <div className="max-w-2xl mx-auto h-full flex justify-between items-center pl-6 py-4">
        <Link href="/" className="flex flex-col items-center text-sm text-gray-100">
          <Home className="h-6 w-6" />
          <span>{t('home')}</span>
        </Link>

        <Link href="/report/wizard" className="relative -top-6 bg-blue-600 text-white p-3 rounded-full shadow-lg">
          <PlusCircle className="h-12 w-12" />
        </Link>

        <Link href="/heatmap" className="flex flex-col items-center text-sm text-gray-100 pr-6 py-4">
          <Map className="h-6 w-6" />
          <span>{t('viewHeatmap')}</span>
        </Link>
      </div>
    </nav>
  );
}
