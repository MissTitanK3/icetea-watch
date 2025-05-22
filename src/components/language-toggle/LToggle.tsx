'use client';

import { useLanguage } from '@/lib/il8n/provider';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const buttonClasses = (active: boolean) =>
    `px-4 py-2 min-w-[100px] rounded-md text-lg font-medium transition
     ${active ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setLanguage('en')}
        className={buttonClasses(language === 'en')}
        aria-pressed={language === 'en'}>
        English
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={buttonClasses(language === 'es')}
        aria-pressed={language === 'es'}>
        Español
      </button>
    </div>
  );
}
