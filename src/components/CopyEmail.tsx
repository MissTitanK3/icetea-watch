'use client';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { useState } from 'react';

export default function CopyEmail({ email = 'icetea@peoplesrebellion.org' }: { email?: string }) {
  const { t } = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-sm w-fit">
      <span className="text-xl font-mono text-gray-800 dark:text-gray-200">{email}</span>
      <button
        onClick={handleCopy}
        className="text-xl bg-accent bg-amber-900 px-8 py-4 mt-4 rounded hover:bg-amber-200 hover:text-black transition">
        {copied ? t('copiedToClipboard') : t('copyToClipboard')}
      </button>
    </div>
  );
}
