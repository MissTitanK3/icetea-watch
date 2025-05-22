export type ReportFormData = {
  agency_type: string[];
  agency_other: string;
  location: {
    lat: number;
    lng: number;
  } | null;
  media_url: File | null;
};

export type Report = {
  id: string;
  agency_type: string[];
  agency_other: string;
  location: {
    lat: number;
    lng: number;
  };
  media_url: string | null;
  timestamp: string; // ISO
};

export type QueuedReport = ReportFormData & {
  id: string; // UUID
  timestamp: string; // ISO string
  synced?: boolean;
  media_url?: string | null;
};
