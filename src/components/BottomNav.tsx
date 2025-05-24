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

  const isWizard = pathname.startsWith('/report/wizard');

  const handleNextOrFinish = () => {
    if (step === 2) {
      finish();
    } else {
      next();
    }
  };

  const baseNavClass =
    'fixed bottom-0 left-0 right-0 z-50 bg-gray-800 shadow-md h-16 rounded-t-2xl grid grid-cols-3 place-items-center';

  if (isWizard) {
    return (
      <nav className={baseNavClass}>
        <button
          onClick={back}
          className={`flex items-center gap-1 text-sm ${
            step === 0 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-100'
          }`}
          disabled={step === 0}>
          <ChevronLeft className="h-6 w-6" />
          {t('back')}
        </button>

        <Link href="/" className="relative -top-6 bg-blue-600 text-white p-3 rounded-full shadow-lg">
          <Home className="h-8 w-8" />
        </Link>

        <button
          onClick={handleNextOrFinish}
          className={`flex items-center gap-1 px-4 py-2 rounded-full shadow ${
            canContinue ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!canContinue}>
          {step === 2 ? t('submit') : t('next')}
          {step === 2 ? <SendHorizonal className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
        </button>
      </nav>
    );
  }

  return (
    <nav className={baseNavClass}>
      <Link href="/" className="flex flex-col items-center text-sm text-gray-100">
        <Home className="h-6 w-6" />
        <span>{t('home')}</span>
      </Link>

      <Link href="/report/wizard" className="relative -top-6 bg-blue-600 text-white p-3 rounded-full shadow-lg">
        <PlusCircle className="h-12 w-12" />
      </Link>

      <Link href="/heatmap" className="flex flex-col items-center text-sm text-gray-100">
        <Map className="h-6 w-6" />
        <span>{t('viewHeatmap')}</span>
      </Link>
    </nav>
  );
}
