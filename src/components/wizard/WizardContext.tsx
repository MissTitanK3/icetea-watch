'use client';

import { createContext, useContext, useState } from 'react';
import { ReportFormData } from '@/types/wizard';

type WizardContextType = {
  step: number;
  setStep: (step: number) => void;
  next: () => void;
  back: () => void;
  canContinue: boolean;
  setCanContinue: (val: boolean) => void;
  formData: ReportFormData;
  setFormData: React.Dispatch<React.SetStateAction<ReportFormData>>;
  finish: () => Promise<void>;
};

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [canContinue, setCanContinue] = useState(false);
  const [formData, setFormData] = useState<ReportFormData>({
    agency_type: [],
    agency_other: '',
    location: null,
    media_url: null,
  });

  const next = () => {
    if (canContinue) setStep((s) => Math.min(s + 1, 2));
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const finish = async () => {
    const { agency_type, agency_other, location, media_url } = formData;
    const timestamp = new Date().toISOString();
    const id = crypto.randomUUID();

    const report = {
      id,
      agency_type,
      agency_other,
      location,
      media_url,
      timestamp,
    };

    const isOffline = !navigator.onLine;
    const { addReportToQueue } = await import('@/utils/reportQueue');
    const { supabase } = await import('@/utils/supabase/client');

    if (isOffline) {
      addReportToQueue(report);
      window.location.href = '/report/wizard';
      return;
    }

    try {
      const { error } = await supabase.from('wizard').insert([
        {
          agency_type,
          agency_other,
          location,
          media_url,
          timestamp,
        },
      ]);

      if (error) {
        console.error('Insert failed:', error);
        addReportToQueue(report);
      }
    } catch (err) {
      console.error('Submission error:', err);
      addReportToQueue(report);
    }

    window.location.href = '/report/wizard'; // redirect or show confirmation screen
  };

  return (
    <WizardContext.Provider
      value={{
        step,
        setStep,
        next,
        back,
        canContinue,
        setCanContinue,
        formData,
        setFormData,
        finish,
      }}>
      {children}
    </WizardContext.Provider>
  );
}

export const useWizard = () => {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within a WizardProvider');
  return ctx;
};
