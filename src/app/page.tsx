'use client';
import CopyEmail from '@/components/CopyEmail';
import KnowYourRights from '@/components/KnowYourRights';
import LanguageSwitcher from '@/components/language-toggle/LToggle';
import { useTranslations } from '@/lib/il8n/useTranslations';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslations();
  return (
    <div className="flex flex-col gap-4 text-center ">
      <LanguageSwitcher />
      <h1 className="text-4xl font-bold">{t('homeTitle')}</h1>
      <p className="text-lg">{t('privacyTagline')}</p>
      <div className="flex justify-center gap-4 mt-8 flex-col">
        <Link href="https://ko-fi.com/techwitch" className="px-6 py-2 border rounded-xl" target="_blank">
          {t('supportProject')}
        </Link>
        <Link href="/req-language-support" className="px-6 py-2 border rounded-xl">
          {t('requestLanguageSupport')}
        </Link>
        <div className="flex flex-col text-center py-20 justify-center m-auto">
          <h4>
            If you have any trouble with the app, email us and let us know whats going on! That way we can fix it.
          </h4>
          <div className="flex flex-col text-center py-5 justify-center m-auto">
            <CopyEmail />
          </div>
        </div>
      </div>
      <KnowYourRights />
    </div>
  );
}
