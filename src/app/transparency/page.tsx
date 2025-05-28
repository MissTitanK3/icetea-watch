'use client';

import GitHubCard from '@/components/GithubCard';
import { useTranslations } from '@/lib/il8n/useTranslations';

export default function TransparencyPage() {
  const { t } = useTranslations();

  return (
    <div className="p-6 max-w-4xl mx-auto text-base leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">{t('reportTitle')}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t('whyUpload')}</h2>
        <p>ICE Tea Watch is a community tool built to protect, not to surveil. {t('mediaPrivacyNote')}</p>
      </section>

      <GitHubCard />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t('media')}</h2>
        <ul className="list-disc ml-6">
          <li>{t('agencyLabel')}</li>
          <li>{t('otherAgency')}</li>
          <li>{t('locationPrompt')}</li>
          <li>{t('uploadMedia')}</li>
          <li>{t('timeLabel')}</li>
        </ul>
        <p className="mt-2">🛡️ {t('mediaPrivacyNote')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t('kyrTitle')}</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">ReportFormData</h3>
          <pre className="bg-gray-700 text-sm p-4 overflow-x-auto">
            {`export type ReportFormData = {
  agency_type: string[];
  agency_other: string;
  location: {
    lat: number;
    lng: number;
  } | null;
  media_url: File | null;
};`}
          </pre>
          <p>{t('troubleWithApp')}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Report</h3>
          <pre className="bg-gray-700 text-sm p-4 overflow-x-auto">
            {`export type Report = {
  id: string;
  agency_type: string[];
  agency_other: string;
  location: {
    lat: number;
    lng: number;
  };
  media_url: string | null;
  timestamp: string; // ISO
};`}
          </pre>
          <p>{t('liveReportPreview')}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">QueuedReport</h3>
          <pre className="bg-gray-700 text-sm p-4 overflow-x-auto">
            {`export type QueuedReport = ReportFormData & {
  id: string; // UUID
  timestamp: string; // ISO string
  synced?: boolean;
  media_url?: string | null;
};`}
          </pre>
          <p>{t('mediaFundingNotice')}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t('copyToClipboard')}</h2>
        <p>
          On desktop, right-click → Inspect → Network tab → look for a POST to <code>/api/report</code>.{' '}
          {t('copiedToClipboard')}
        </p>
        <p className="mt-2">
          {t('languageSupportInvite')}{' '}
          <a href="https://httptoolkit.tech/" className="underline text-blue-600" target="_blank">
            HTTP Toolkit
          </a>
          .
        </p>
      </section>
    </div>
  );
}
