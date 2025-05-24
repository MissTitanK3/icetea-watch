'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { useWizard } from './WizardContext';

export default function MediaStep() {
  const { t } = useTranslations();
  const { setCanContinue } = useWizard();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    setCanContinue(true); // Always allow submission
  }, [setCanContinue]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t('haveMedia')}</h3>
        <p className="text-sm text-gray-600">{t('optionalNote')}</p>
      </div>

      <div className="flex items-center gap-2">
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
    </div>
  );
}
