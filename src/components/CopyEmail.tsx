'use client';
import { useState } from 'react';

export default function CopyEmail({ email = 'icetea@peoplesrebellion.org' }: { email?: string }) {
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
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-sm w-fit">
      <span className="text-sm font-mono text-gray-800 dark:text-gray-200">{email}</span>
      <button
        onClick={handleCopy}
        className="text-xs bg-accent text-white px-2 py-1 rounded hover:bg-accent/80 transition">
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
