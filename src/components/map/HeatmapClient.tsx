'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AGENCY_OPTIONS } from '@/constants/agencies';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Report } from '@/types/wizard';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { TranslationKey } from '@/lib/il8n/translations';
import TimeRangeSlider from '@/components/TimeRangeSlider';
import { LatLngExpression } from 'leaflet';
import { useFindMe } from '@/lib/useFindMe';
import TileLayerDropdown from './TileLayerDropdown';

const Map = dynamic(() => import('@/components/map/HeatLayer'), { ssr: false });

function filterReports(reports: Report[], timeRange: [number, number], agencyFilter: string[]) {
  const isAllActive = agencyFilter.length === 0;
  const now = Date.now();

  return reports.filter((r) => {
    const ageHr = (now - new Date(r.timestamp).getTime()) / (1000 * 60 * 60);
    const matchesTime = ageHr >= timeRange[0] && ageHr <= timeRange[1];
    const matchesAgency = isAllActive || r.agency_type.some((a) => agencyFilter.includes(a));
    const hasLocation = r.location && typeof r.location.lat === 'number' && typeof r.location.lng === 'number';
    return matchesTime && matchesAgency && hasLocation;
  });
}

export default function HeatmapClient() {
  const { t } = useTranslations();
  const [agencyFilter, setAgencyFilter] = useState<string[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [visibleReports, setVisibleReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState<LatLngExpression>([47.6062, -122.3321]);
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 168]);
  const { handleFindMe, isLocating, error } = useFindMe((coords) => {
    setCenter(coords);
  });

  const isAllActive = agencyFilter.length === 0;

  useEffect(() => {
    // Attempt to load stored agency filter from localStorage
    const storedAgency = localStorage.getItem('agencyFilter');
    if (storedAgency) setAgencyFilter(JSON.parse(storedAgency));

    // Fire location lookup
    handleFindMe();

    // Load reports from API
    async function fetchReports() {
      try {
        const res = await fetch('/api/wizard');
        const json = await res.json();
        if (json.wizard) {
          setReports(json.wizard);
          const initialFiltered = filterReports(json.wizard, timeRange, agencyFilter);
          setVisibleReports(initialFiltered);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('agencyFilter', JSON.stringify(agencyFilter));
  }, [agencyFilter]);

  useEffect(() => {
    const filtered = filterReports(reports, timeRange, agencyFilter);
    setVisibleReports(filtered);
  }, [agencyFilter, timeRange, reports]);

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

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-4 flex-wrap items-center w-full">
        <TimeRangeSlider
          reports={reports}
          onChange={(range) => {
            setTimeRange(range);
          }}
        />

        <div className="flex flex-wrap gap-2 w-full">
          {AGENCY_OPTIONS.map((agency) => {
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

      <button
        onClick={handleFindMe}
        disabled={isLocating}
        className="bg-green-800 px-10 py-2 font-bold rounded-md shadow hover:bg-accent-dark transition disabled:opacity-50">
        {isLocating ? 'Locating...' : `📍 ${t('findMe') ?? 'Find Me'}`}
      </button>
      <TileLayerDropdown />
      {loading ? <LoadingSpinner text="Loading reports…" /> : <Map reports={visibleReports} center={center} />}

      <p className="text-xs text-gray-500 max-w-md pt-2">{t('warning')}</p>
    </div>
  );
}
