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

// function ColorizedJson({ json }: { json: string }) {
//   return (
//     <pre className="bg-gray-900 text-green-200 p-4 rounded overflow-x-auto text-sm max-h-96 border">
//       {json.split('\n').map((line, i) => {
//         return (
//           <div key={i} className="whitespace-pre">
//             <span className="text-gray-500">{line.slice(0, line.indexOf('"'))}</span>
//             <span className="text-yellow-400">{line.slice(line.indexOf('"'), line.indexOf(':') + 1)}</span>
//             <span className="text-white">{line.slice(line.indexOf(':') + 1)}</span>
//           </div>
//         );
//       })}
//     </pre>
//   );
// }
function ColorizedJson({ json }: { json: string }) {
  return (
    <pre className="bg-gray-900 text-sm text-white font-mono p-4 rounded border overflow-x-auto max-h-96 leading-relaxed">
      {json.split('\n').map((line, idx) => {
        const keyMatch = line.match(/^\s*"([^"]+)"\s*:/);
        const valueMatch = line.match(/:\s*"([^"]*)"/);

        const indent = line.match(/^\s*/)?.[0] || '';

        return (
          <div key={idx}>
            <span className="text-gray-600">{indent}</span>
            {keyMatch && <span className="text-yellow-400">{`"${keyMatch[1]}"`}</span>}
            {keyMatch && <span className="text-white">: </span>}
            {valueMatch ? (
              <span className="text-green-400">{`"${valueMatch[1]}"`}</span>
            ) : (
              <span className="text-gray-400">{line.trim().replace(/^".*":\s*/, '')}</span>
            )}
          </div>
        );
      })}
    </pre>
  );
}

function CollapsibleJson({ label, json }: { label: string; json: object }) {
  const [open, setOpen] = useState(false);

  const renderLines = (obj: object) => {
    const jsonStr = JSON.stringify(obj, null, 2);
    return jsonStr.split('\n').map((line, idx) => {
      const keyMatch = line.match(/^\s*"([^"]+)"\s*:/);
      const valueMatch = line.match(/:\s*"([^"]*)"/);
      const indent = line.match(/^\s*/)?.[0] || '';

      return (
        <div key={idx} className="whitespace-pre leading-relaxed font-mono">
          <span className="text-gray-600">{indent}</span>
          {keyMatch && <span className="text-yellow-400">{`"${keyMatch[1]}"`}</span>}
          {keyMatch && <span className="text-white">: </span>}
          {valueMatch ? (
            <span className="text-green-400">{`"${valueMatch[1]}"`}</span>
          ) : (
            <span className="text-gray-300">{line.trim().replace(/^".*":\s*/, '')}</span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="font-semibold text-blue-500 underline text-left w-full mb-1 text-2xl">
        {open ? `▼ ${label}` : `▶ ${label}`}
      </button>
      {open && (
        <div className="bg-gray-900 text-sm text-white p-4 rounded border overflow-x-auto max-h-96">
          {renderLines(json)}
        </div>
      )}
    </div>
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
        {Object.entries(TRANSLATIONS).map(([lang, content]) => (
          <CollapsibleJson key={lang} label={`[${lang}]`} json={content} />
        ))}
      </section>
    </main>
  );
}
