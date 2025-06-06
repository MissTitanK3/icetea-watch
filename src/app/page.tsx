'use client';
import CopyEmail from '@/components/CopyEmail';
import CourtAppearance from '@/components/CourtAppearance';
import KnowYourRights from '@/components/KnowYourRights';
import LanguageSwitcher from '@/components/language-toggle/LToggle';
import ICEArrestQuestions from '@/components/Questions';
import { useTranslations } from '@/lib/il8n/useTranslations';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslations();
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full m-auto flex flex-col justify-center text-center items-center">
        <Image src="/logo.svg" alt="ICE Tea Watch Logo" width={400} height={40} className="mb-10" />
        <h1 className="text-4xl font-bold">{t('homeTitle')}</h1>
        <p className="text-lg">{t('privacyTagline')}</p>
      </div>
      <LanguageSwitcher />
      <div className="flex justify-center gap-4 mt-8 flex-col">
        <Link href="https://ko-fi.com/techwitch" className="px-6 py-2 border rounded-xl" target="_blank">
          {t('supportProject')}
        </Link>
        <Link href="/req-language-support" className="px-6 py-2 border rounded-xl">
          {t('requestLanguageSupport')}
        </Link>
        <Link href="/transparency" className="px-6 py-2 border rounded-xl">
          {t('transparencyTitle')}
        </Link>
        <div className="flex flex-col text-center py-20 justify-center m-auto">
          <h4>{t('troubleWithApp')}</h4>
          <div className="flex flex-col text-center py-5 justify-center m-auto">
            <CopyEmail />
          </div>
          <CourtAppearance />
          <ICEArrestQuestions />
        </div>
      </div>
      <KnowYourRights />
    </div>
  );
}
