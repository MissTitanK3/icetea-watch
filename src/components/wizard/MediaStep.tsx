import { useState, useEffect } from 'react';
import { ReportFormData } from '@/types/wizard';
import { addReportToQueue } from '@/utils/reportQueue';
import { supabase } from '@/utils/supabase/client';
import { useTranslations } from '@/lib/il8n/useTranslations';

// Generate a UUID
const generateUUID = () => crypto.randomUUID();

type Props = {
  data: ReportFormData;
  onUpdate: (values: Partial<ReportFormData>) => void;
  onBack: () => void;
};

export default function MediaStep({ data, onBack }: Props) {
  const { t } = useTranslations();
  // const [file, setFile] = useState<File | null>(data.media_url || null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [finished, setFinished] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleFinish = async () => {
    const isOffline = !navigator.onLine;

    const reportToQueue = {
      id: generateUUID(),
      agency_type: data.agency_type,
      agency_other: data.agency_other,
      location: data.location,
      media_url: data.media_url,
      timestamp: new Date().toISOString(),
    };
    if (isOffline) {
      addReportToQueue(reportToQueue);
      setFinished(true);
      return;
    }

    try {
      const { error: insertError } = await supabase.from('wizard').insert([
        {
          agency_type: data.agency_type || [''],
          agency_other: data.agency_other || '',
          location: data.location || {
            lat: '',
            lng: '',
          },
          media_url: data.media_url || '',
          timestamp: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        console.error('Insert failed:', insertError);
        addReportToQueue(reportToQueue);
        throw insertError;
      }
    } catch (err) {
      console.error(`Network error, queuing report locally. ${err}`);
      addReportToQueue(reportToQueue);
    }

    setFinished(true);
  };

  useEffect(() => {
    if (!finished) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [finished]);

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = '/report/wizard'; // fallback works even if router fails
    }
  }, [countdown]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t('haveMedia')}</h3>
        <p className="text-sm text-gray-600">{t('optionalNote')}</p>
      </div>

      <div className="flex items-center gap-2">
        {/* <label className="block text-sm font-medium">Upload:</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] || null;
            setFile(selectedFile);
            onUpdate({ media_url: selectedFile });
          }}
        /> */}
        <p>{t('mediaFundingNotice')}</p>
      </div>
      <div
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className="relative text-sm text-gray-600 underline cursor-help">
        {t('whyUpload')}
        {tooltipVisible && (
          <div className="absolute top-full mt-1 w-72 p-2 bg-white border shadow text-xs text-left z-10">
            {t('mediaPrivacyNote')}
          </div>
        )}
      </div>

      {/* {file && <div className="text-sm text-green-600">Selected file: {file.name}</div>} */}

      {finished ? (
        <div className="text-green-700 text-sm pt-4">✅ Report complete. Redirecting in {countdown}...</div>
      ) : (
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="px-16 py-3 text-lg border rounded-2xl hover:bg-gray-100 hover:text-black transition">
            {t('back')}
          </button>
          <button
            className={`px-16 py-3 text-lg rounded-2xl transition ${
              !finished ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={finished}
            onClick={handleFinish}>
            {t('finish')}
          </button>
        </div>
      )}
    </div>
  );
}
