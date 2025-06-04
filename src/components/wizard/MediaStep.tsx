'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { useWizard } from './WizardContext';
import { TranslationKey } from '@/lib/il8n/translations';

export default function MediaStep() {
  const { t } = useTranslations();
  const { setCanContinue, formData, setFormData } = useWizard();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

  const buttonStyle = (isSelected: boolean) =>
    `flex items-center justify-between px-4 py-6 rounded border transition m-auto w-full justify-center ${
      isSelected
        ? 'bg-blue-600 text-white border-blue-700'
        : 'bg-gray-700 border-gray-300 text-gray-100 hover:bg-gray-100 hover:text-black'
    }`;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-base">{t('officerMovement')}</h4>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, officer_moving: true }))}
            className={buttonStyle(formData.officer_moving === true)}>
            {t('moving')}
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                officer_moving: false,
                officer_direction: null,
              }))
            }
            className={buttonStyle(formData.officer_moving === false)}>
            {t('stationary')}
          </button>
        </div>

        {formData.officer_moving && (
          <div>
            <label className="block text-sm font-medium mb-2">{t('directionOfTravel')}</label>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                'NorthWest',
                'North',
                'NorthEast',
                'West',
                null, // center skipped
                'East',
                'SouthWest',
                'South',
                'SouthEast',
              ].map((dir) =>
                dir ? (
                  <button
                    key={dir}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, officer_direction: dir as typeof prev.officer_direction }))
                    }
                    className={buttonStyle(formData.officer_direction === dir)}>
                    {t(`direction.${dir}` as TranslationKey)}
                  </button>
                ) : (
                  <div key="spacer" />
                ),
              )}
            </div>
          </div>
        )}
      </div>

      <hr className="my-4" />

      <div className="space-y-2">
        <h4 className="font-semibold text-base">{t('emergencyIndicators')}</h4>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, lights_on: !prev.lights_on }))}
            className={buttonStyle(!!formData.lights_on)}>
            <span className="flex items-center justify-between w-full">
              <span>{t('lights')}</span>
              <span className={`w-3 h-3 rounded-full ${formData.lights_on ? 'bg-green-400' : 'bg-red-400'}`} />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, sirens_on: !prev.sirens_on }))}
            className={buttonStyle(!!formData.sirens_on)}>
            <span className="flex items-center justify-between w-full">
              <span>{t('sirens')}</span>
              <span className={`w-3 h-3 rounded-full ${formData.sirens_on ? 'bg-green-400' : 'bg-red-400'}`} />
            </span>
          </button>
        </div>
      </div>

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

      <hr className="my-4" />
    </div>
  );
}
