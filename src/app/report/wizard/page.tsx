// app/report/wizard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import AgencyStep from '@/components/wizard/AgencyStep';
import LocationStep from '@/components/wizard/LocationStep';
import MediaStep from '@/components/wizard/MediaStep';
import { ReportFormData } from '@/types/wizard';
import { getQueuedReports } from '@/utils/reportQueue';
import Link from 'next/link';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { TranslationKey } from '@/lib/il8n/translations';

const steps = ['Agency', 'Location', 'Media'];

function FormDataPreview({
  formData,
}: // queuedReports,
{
  formData: ReportFormData;
  queuedReports: {
    id: string;
    agency_type: string[];
    timestamp: string;
  }[];
}) {
  const { t } = useTranslations();
  return (
    <div className="p-4 rounded border text-sm space-y-2">
      <h3 className="font-semibold text-base">{t('liveReportPreview')}</h3>

      <div>
        <strong>{t('agencies')}:</strong>{' '}
        {formData.agency_type.length > 0
          ? formData.agency_type.map((agency) => t(`agency.${agency}` as TranslationKey)).join(', ')
          : t('noneSelected')}
      </div>

      {formData.agency_other && (
        <div>
          <strong>{t('otherAgency')}:</strong> {formData.agency_other}
        </div>
      )}

      <div>
        <strong>{t('location')}</strong>{' '}
        {formData.location ? `${formData.location.lat.toFixed(5)}, ${formData.location.lng.toFixed(5)}` : t('notSet')}
      </div>

      <div>
        <strong>{t('media')}</strong> {formData.media_url ? formData.media_url.name : t('noFileUploaded')}
      </div>
      {/* {queuedReports?.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-sm font-semibold">Queued Reports</h4>
          <p className="text-xs text-gray-500 mb-2">These will be submitted when connection is restored.</p>
          <ul className="space-y-1 text-sm text-gray-700">
            {queuedReports.map((r) => (
              <li key={r.id}>
                {r.agency_type.join(', ')} –{' '}
                <span className="text-gray-500">{new Date(r.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

export default function WizardPage() {
  const { t } = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ReportFormData>({
    agency_type: [],
    agency_other: '',
    location: null,
    media_url: null,
  });
  const [offlineQueue, setOfflineQueue] = useState<{ id: string; agency_type: string[]; timestamp: string }[]>([]);

  useEffect(() => {
    const queue = getQueuedReports();
    setOfflineQueue(queue);
  }, []);

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const updateForm = (data: object) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <LocationStep data={formData} onNext={next} onUpdate={updateForm} />;
      case 1:
        return <AgencyStep data={formData} onNext={next} onUpdate={updateForm} onBack={back} />;
      case 2:
        return <MediaStep data={formData} onBack={back} onUpdate={updateForm} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-evenly items-center">
        <Link
          href="/"
          className="flex-1 max-w-[40%] px-4 py-3 rounded border text-base font-medium text-left bg-gray-700 text-white border-gray-700">
          {t('home')}
        </Link>
        <Link
          href="https://wikipedia.org"
          className="flex-1 max-w-[40%] px-4 py-3 rounded border text-base font-medium text-center uppercase text-red-500">
          {t('quickExit')}
        </Link>
      </div>
      <h2 className="text-xl font-bold">{t('reportWizard')}</h2>

      <div className="flex gap-2">
        {steps.map((label, i) => (
          <div key={label} className={`flex-1 h-2 rounded-full ${i <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`} />
        ))}
      </div>

      {renderStep()}

      <div className="md:col-span-1">
        <FormDataPreview formData={formData} queuedReports={offlineQueue} />
      </div>
    </div>
  );
}
