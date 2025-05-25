import { useCallback, useState } from 'react';
import { LatLngExpression } from 'leaflet';

export function useFindMe(
  onLocate: (coords: LatLngExpression) => void,
  getTranslation?: (key: string) => string | undefined,
) {
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindMe = useCallback(() => {
    setIsLocating(true);
    setError(null);

    const success = (pos: GeolocationPosition) => {
      const coords: LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
      onLocate(coords);
      setIsLocating(false);
    };

    const failure = () => {
      const fallbackMessage = getTranslation?.('locationDenied') ?? 'Unable to retrieve location.';
      alert(fallbackMessage);
      setError(fallbackMessage);
      setIsLocating(false);
    };

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'granted' || result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(success, failure, {
              enableHighAccuracy: true,
              timeout: 10000,
            });
          } else {
            failure();
          }
        })
        .catch(() => {
          navigator.geolocation.getCurrentPosition(success, failure, {
            enableHighAccuracy: true,
            timeout: 10000,
          });
        });
    } else {
      navigator.geolocation.getCurrentPosition(success, failure, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    }
  }, [onLocate, getTranslation]);

  return { handleFindMe, isLocating, error };
}
