'use client';

import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { AGENCY_OPTIONS } from '@/constants/agencies';
import { TranslationKey } from '@/lib/il8n/translations';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { useWizard } from './WizardContext';

export default function AgencyStep() {
  const { t } = useTranslations();
  const { formData, setFormData, setCanContinue } = useWizard();

  const toggle = (agency: string) => {
    setFormData((prev) => {
      const agency_type = prev.agency_type.includes(agency)
        ? prev.agency_type.filter((a) => a !== agency)
        : [...prev.agency_type, agency];
      return { ...prev, agency_type };
    });
  };

  const handleOtherChange = (value: string) => {
    setFormData((prev) => ({ ...prev, agency_other: value }));
  };

  useEffect(() => {
    const hasData = formData.agency_type.length > 0 || formData.agency_other.trim().length > 0;
    setCanContinue(hasData);
  }, [formData.agency_type, formData.agency_other, setCanContinue]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t('whoDidYouSee')}</h3>
        <p className="text-sm text-gray-600">{t('tapAllThatApply')}</p>
      </div>

      <div className="flex flex-col gap-2">
        {AGENCY_OPTIONS.map((agency) => {
          const isSelected = formData.agency_type.includes(agency);
          return (
            <button
              key={agency}
              type="button"
              onClick={() => toggle(agency)}
              className={`flex items-center justify-between px-4 py-6 rounded border transition ${
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
          value={formData.agency_other}
          onChange={(e) => handleOtherChange(e.target.value)}
          className="w-full p-2 py-8 text-2xl border rounded"
        />
      </div>
    </div>
  );
}
