'use client';
import LanguageSwitcher from '@/components/language-toggle/LToggle';
import { useTranslations } from '@/lib/il8n/useTranslations';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslations();
  return (
    <div className="flex flex-col gap-4 text-center py-20">
      <h1 className="text-4xl font-bold">{t('homeTitle')}</h1>
      <LanguageSwitcher />
      <p className="text-lg">{t('privacyTagline')}</p>
      <div className="flex justify-center gap-4 mt-8 flex-col">
        <Link href="/report/wizard" className="px-6 py-2 bg-blue-600 text-white rounded-xl">
          {t('startReport')}
        </Link>
        <Link href="/heatmap" className="px-6 py-2 border rounded-xl">
          {t('viewHeatmap')}
        </Link>
        <Link href="https://ko-fi.com/techwitch" className="px-6 py-2 border rounded-xl">
          {t('supportProject')}
        </Link>
      </div>
    </div>
  );
}
