// app/report/wizard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import AgencyStep from '@/components/wizard/AgencyStep';
import LocationStep from '@/components/wizard/LocationStep';
import MediaStep from '@/components/wizard/MediaStep';
import { ReportFormData } from '@/types/wizard';
import { getQueuedReports } from '@/utils/reportQueue';
import Link from 'next/link';

const steps = ['Agency', 'Location', 'Media'];

function FormDataPreview({
  formData,
  queuedReports,
}: {
  formData: ReportFormData;
  queuedReports: {
    id: string;
    agency_type: string[];
    timestamp: string;
  }[];
}) {
  return (
    <div className="p-4 rounded border text-sm space-y-2">
      <h3 className="font-semibold text-base">Live Report Preview</h3>

      <div>
        <strong>Agencies:</strong> {formData.agency_type.length > 0 ? formData.agency_type.join(', ') : 'None selected'}
      </div>

      {formData.agency_other && (
        <div>
          <strong>Other Agency:</strong> {formData.agency_other}
        </div>
      )}

      <div>
        <strong>Location:</strong>{' '}
        {formData.location ? `${formData.location.lat.toFixed(5)}, ${formData.location.lng.toFixed(5)}` : 'Not set'}
      </div>

      <div>
        <strong>Media:</strong> {formData.media_url ? formData.media_url.name : 'No file uploaded'}
      </div>
      {queuedReports?.length > 0 && (
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
      )}
    </div>
  );
}

export default function WizardPage() {
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
        return <AgencyStep data={formData} onNext={next} onUpdate={updateForm} />;
      case 1:
        return <LocationStep data={formData} onNext={next} onBack={back} onUpdate={updateForm} />;
      case 2:
        return <MediaStep data={formData} onBack={back} onUpdate={updateForm} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex-1 max-w-[20%] px-4 py-3 rounded border text-base font-medium text-left bg-gray-700 text-white border-gray-700">
          Home
        </Link>
        <h2 className="text-xl font-bold">Report Wizard</h2>
        <Link
          href="https://wikipedia.org"
          className="flex-1 max-w-[20%] px-4 py-3 rounded border text-base font-medium text-center uppercase text-red-500">
          Quick Exit
        </Link>
      </div>

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
