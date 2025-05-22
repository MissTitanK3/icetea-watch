'use client';

import { useState, useEffect } from 'react';
import { ReportFormData } from '@/types/wizard';
import { Check } from 'lucide-react'; // optional: lightweight icon
import { AGENCY_OPTIONS } from '@/constants/agencies';
import { TranslationKey } from '@/lib/il8n/translations';
import { useTranslations } from '@/lib/il8n/useTranslations';

type Props = {
  data: ReportFormData;
  onUpdate: (values: Partial<ReportFormData>) => void;
  onNext: () => void;
};
export default function AgencyStep({ data, onUpdate, onNext }: Props) {
  const [selected, setSelected] = useState<string[]>(data.agency_type || []);
  const [other, setOther] = useState<string>(data.agency_other || '');
  const { t } = useTranslations();

  useEffect(() => {
    onUpdate({ agency_type: selected, agency_other: other });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, other]);

  const toggle = (agency: string) => {
    setSelected((prev) => (prev.includes(agency) ? prev.filter((a) => a !== agency) : [...prev, agency]));
  };

  const canContinue = selected.length > 0 || other.trim().length > 0;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t('whoDidYouSee')}</h3>
        <p className="text-sm text-gray-600">{t('tapAllThatApply')}</p>
      </div>

      <div className="flex flex-col gap-2">
        {AGENCY_OPTIONS.map((agency) => {
          const isSelected = selected.includes(agency);
          return (
            <button
              key={agency}
              type="button"
              onClick={() => toggle(agency)}
              className={`flex items-center justify-between px-4 py-2 rounded border transition
                ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-gray-700 border-gray-300 text-gray-100 hover:bg-gray-100 hover:text-black'
                }`}>
              <span>{t(`agency.${agency}` as TranslationKey)}</span>
              {isSelected && <Check className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      <div>
        <label className="block text-sm font-medium">{t('other')}</label>
        <input
          type="text"
          placeholder={t('placeholderAgencyExample')}
          value={other}
          onChange={(e) => setOther(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="pt-4">
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`px-4 py-2 rounded ${
            canContinue ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}>
          {t('next')}
        </button>
      </div>
    </div>
  );
}
