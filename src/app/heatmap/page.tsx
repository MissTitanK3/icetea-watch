'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AGENCY_OPTIONS } from '@/constants/agencies';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Report } from '@/types/wizard';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { TranslationKey } from '@/lib/il8n/translations';

const Map = dynamic(() => import('@/components/map/HeatLayer'), { ssr: false });

const timeOptions = [
  { label: '1h', hours: 1 },
  { label: '24h', hours: 24 },
  { label: '48h', hours: 48 },
  { label: '7d', hours: 168 },
];

export default function HeatmapPage() {
  const { t } = useTranslations();
  const [timeWindow, setTimeWindow] = useState(48); // default 48h
  const [agencyFilter, setAgencyFilter] = useState<string[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTime = localStorage.getItem('timeWindow');
    const storedAgency = localStorage.getItem('agencyFilter');

    if (storedTime) setTimeWindow(parseInt(storedTime));
    if (storedAgency) setAgencyFilter(JSON.parse(storedAgency));
  }, []);

  useEffect(() => {
    localStorage.setItem('timeWindow', timeWindow.toString());
    localStorage.setItem('agencyFilter', JSON.stringify(agencyFilter));
  }, [timeWindow, agencyFilter]);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch('/api/wizard');
        const json = await res.json();
        if (json.wizard) {
          setReports(json.wizard);
        } else {
          console.error(json.error);
        }
      } catch (err) {
        console.error('Failed to load reports:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  const now = new Date();

  const filtered = reports.filter((r) => {
    const hasValidLocation = r.location && typeof r.location.lat === 'number' && typeof r.location.lng === 'number';
    if (!hasValidLocation) return false;

    const age = (now.getTime() - new Date(r.timestamp).getTime()) / (1000 * 60 * 60);
    const matchesTime = age <= timeWindow;
    const matchesAgency = agencyFilter.length === 0 || r.agency_type.some((a) => agencyFilter.includes(a));
    return matchesTime && matchesAgency;
  });

  const isAllActive = agencyFilter.length === 0;

  return (
    <div className="space-y-4 w-full text-center">
      <div className="flex justify-evenly">
        <Link
          href="https://wikipedia.org"
          className="flex-1 max-w-[40%] px-4 py-3 rounded border text-base font-medium text-center uppercase text-red-500">
          {t('quickExit')}
        </Link>
      </div>
      <h2 className="text-2xl font-bold">{t('reportTitle')}</h2>

      <div className="flex gap-4 flex-wrap items-center w-full">
        <div className="flex flex-wrap gap-2 w-full">
          {timeOptions?.map((t) => (
            <button
              key={t.label}
              onClick={() => setTimeWindow(t.hours)}
              className={`flex-1 min-w-[20%] px-4 py-3 rounded border text-base font-medium text-left transition
        ${
          timeWindow === t.hours
            ? 'bg-gray-700 text-white border-gray-700'
            : 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
        }
      `}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 w-full">
          {AGENCY_OPTIONS?.map((agency) => {
            const isActive = isAllActive || agencyFilter.includes(agency);
            return (
              <button
                key={agency}
                onClick={() => {
                  if (isAllActive) {
                    setAgencyFilter([agency]);
                  } else if (agencyFilter.includes(agency)) {
                    setAgencyFilter(agencyFilter.filter((a) => a !== agency));
                  } else {
                    setAgencyFilter([...agencyFilter, agency]);
                  }
                }}
                className={`flex-1 min-w-[40%] px-4 py-3 rounded border text-base font-medium text-left transition
        ${
          isActive
            ? 'bg-green-900 text-white border-green-800'
            : 'bg-gray-700 text-white border-gray-300 hover:bg-gray-200'
        }`}>
                {t(`agency.${agency}` as TranslationKey)}
              </button>
            );
          })}
        </div>
      </div>
      {loading ? <LoadingSpinner text="Loading reports…" /> : <Map reports={filtered} />}

      <p className="text-xs text-gray-500 max-w-md pt-2">{t('warning')}</p>
    </div>
  );
}
