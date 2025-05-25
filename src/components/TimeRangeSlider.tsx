'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Range } from 'react-range';

const MAX = 168;
const STEP = 4;

type Props = {
  reports?: { timestamp: string }[];
  onChange: (range: [number, number]) => void;
};

export default function TimeRangeSlider({ onChange }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const parseIntOrDefault = (value: string | null, fallback: number) =>
    Math.max(0, Math.min(MAX, parseInt(value || '', 10) || fallback));

  const initialFrom = parseIntOrDefault(searchParams.get('from'), 0);
  const initialTo = parseIntOrDefault(searchParams.get('to'), MAX);

  const [range, setRange] = useState<[number, number]>([
    Math.min(initialFrom, initialTo),
    Math.max(initialFrom, initialTo),
  ]);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced URL update
  const updateUrl = (from: number, to: number) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('from', String(from));
      params.set('to', String(to));
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300);
  };

  const handleSliderChange = (values: [number, number]) => {
    setRange(values);
    onChange(values);
    updateUrl(values[0], values[1]);
  };

  const setPreset = (hoursAgo: number) => {
    const newRange: [number, number] = [0, hoursAgo];
    setRange(newRange);
    onChange(newRange);
    updateUrl(0, hoursAgo);
  };

  useEffect(() => {
    const urlFrom = parseIntOrDefault(searchParams.get('from'), 0);
    const urlTo = parseIntOrDefault(searchParams.get('to'), MAX);
    const normalized: [number, number] = [Math.min(urlFrom, urlTo), Math.max(urlFrom, urlTo)];

    // Only update state if values actually changed
    if (normalized[0] !== range[0] || normalized[1] !== range[1]) {
      setRange(normalized);
      onChange(normalized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="my-4 flex flex-col justify-center m-auto">
      {/* Presets */}
      <div className="flex gap-2 mb-4 justify-evenly">
        <button
          onClick={() => setPreset(24)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm">
          Last 24h
        </button>
        <button
          onClick={() => setPreset(72)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm">
          Last 3d
        </button>
        <button
          onClick={() => setPreset(168)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm">
          Last 7d
        </button>
      </div>

      {/* Label */}
      <label className="block font-semibold mb-15">
        Showing reports from {Math.floor(range[0] / 24)}d {range[0] % 24}h → {Math.floor(range[1] / 24)}d{' '}
        {range[1] % 24}h ago
      </label>

      {/* Range Slider */}
      <Range
        values={range}
        step={STEP}
        min={0}
        max={MAX}
        onChange={(values) => handleSliderChange(values as [number, number])}
        renderTrack={({ props, children }) => (
          <div {...props} className="w-full h-2 bg-gray-700 rounded relative" style={props.style}>
            <div
              className="absolute top-0 bottom-0 bg-blue-500 rounded"
              style={{
                left: `${(range[0] / MAX) * 100}%`,
                width: `${((range[1] - range[0]) / MAX) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, value, isDragged }) => {
          const { key, ...safeProps } = props;
          return (
            <div
              key={key}
              {...safeProps}
              className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full border-2 transition
      ${isDragged ? 'border-blue-600 bg-blue-500 scale-110' : 'border-blue-400 bg-white'}
      focus:outline-none focus:ring-2 focus:ring-blue-500`}>
              {/* Label above the thumb */}
              <div
                className="absolute -top-7 text-xs font-medium text-white bg-gray-800 px-2 py-1 rounded shadow"
                style={{ whiteSpace: 'nowrap' }}>
                {Math.floor(value / 24)}d {value % 24}h
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
