'use client';

import { useEffect, useState } from 'react';
import { TRANSLATIONS } from '@/lib/il8n/translations';
import Link from 'next/link';
import { useTranslations } from '@/lib/il8n/useTranslations';

function CopyTemplateButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={copy} className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
      {copied ? 'Copied!' : 'Copy Template'}
    </button>
  );
}

function ColorizedJson({ json }: { json: string }) {
  return (
    <pre className="bg-gray-900 text-green-200 p-4 rounded overflow-x-auto text-sm max-h-96 border">
      {json.split('\n').map((line, i) => {
        return (
          <div key={i} className="whitespace-pre">
            <span className="text-gray-500">{line.slice(0, line.indexOf('"'))}</span>
            <span className="text-yellow-400">{line.slice(line.indexOf('"'), line.indexOf(':') + 1)}</span>
            <span className="text-white">{line.slice(line.indexOf(':') + 1)}</span>
          </div>
        );
      })}
    </pre>
  );
}

export default function RequestLanguageSupportPage() {
  const [template, setTemplate] = useState('');
  const { t } = useTranslations();

  useEffect(() => {
    const keys = Object.keys(TRANSLATIONS.en) as (keyof (typeof TRANSLATIONS)['en'])[];
    const obj = keys.reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {} as Record<string, string>);
    setTemplate(JSON.stringify(obj, null, 2));
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-evenly">
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
      <h1 className="text-3xl font-bold">🌍 {t('requestLanguageSupport')}</h1>
      <p className="text-lg">
        {t('languageSupportInvite')}{' '}
        <a href="mailto:icetea@peoplesrebellion.org" className="underline text-blue-600">
          icetea@peoplesrebellion.org
        </a>
        .
      </p>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold">📝 {t('translationTemplate')}</h2>
          <CopyTemplateButton text={template} />
        </div>
        <ColorizedJson json={template} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">📚 {t('existingTranslations')}</h2>
        <p className="text-sm text-gray-600 mb-2">{t('includesReference')}</p>
        <pre className="bg-gray-800 text-xs overflow-x-auto p-4 rounded max-h-[600px] border">
          {JSON.stringify(TRANSLATIONS, null, 2)}
        </pre>
      </section>
    </main>
  );
}
