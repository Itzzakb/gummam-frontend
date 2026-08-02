import React, { useEffect, useRef, useState } from 'react';
import { Expand, MapPin } from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

interface PropertyLocationMapProps {
  location: string;
  sublocality: string;
}

const HYDERABAD_CENTER = { lat: 17.385044, lng: 78.486671 };

const loadGoogleMaps = (apiKey: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve(window.google.maps);
      return;
    }

    const scriptId = 'google-maps-script';
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google.maps));
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const buildQuery = (location: string, sublocality: string) => {
  const parts = [sublocality.trim(), location.trim(), 'Hyderabad', 'Telangana', 'India'].filter(Boolean);
  return parts.join(', ');
};

export const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({
  location,
  sublocality,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [resolvedLabel, setResolvedLabel] = useState('');

  const hasLocation = location.trim().length > 0;
  const hasSublocality = sublocality.trim().length > 0;

  useEffect(() => {
    let cancelled = false;
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

    loadGoogleMaps(apiKey)
      .then((maps) => {
        if (cancelled || !mapRef.current) return;

        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new maps.Map(mapRef.current, {
            center: HYDERABAD_CENTER,
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            zoomControlOptions: { position: maps.ControlPosition.RIGHT_BOTTOM },
          });
        }
        setMapReady(true);
      })
      .catch(() => {
        if (!cancelled) setMapError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !window.google?.maps) return;

    const maps = window.google.maps;
    const map = mapInstanceRef.current;

    const clearOverlays = () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    };

    if (!hasLocation) {
      clearOverlays();
      map.setCenter(HYDERABAD_CENTER);
      map.setZoom(12);
      setResolvedLabel('');
      return;
    }

    const query = buildQuery(location, sublocality);
    const geocoder = new maps.Geocoder();

    const timer = window.setTimeout(() => {
      geocoder.geocode({ address: query }, (results: any[], geocodeStatus: string) => {
        if (geocodeStatus !== 'OK' || !results?.[0]) {
          setResolvedLabel('Location not found. Try a clearer locality name.');
          return;
        }

        const place = results[0];
        const center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        clearOverlays();
        map.setCenter(center);

        const viewport = place.geometry.viewport;
        if (viewport) {
          map.fitBounds(viewport);
        } else {
          map.setZoom(hasSublocality ? 16 : 14);
        }

        const radiusMeters = hasSublocality ? 450 : 1600;
        circleRef.current = new maps.Circle({
          map,
          center,
          radius: radiusMeters,
          strokeColor: '#035096',
          strokeOpacity: 0.95,
          strokeWeight: 2,
          fillColor: '#035096',
          fillOpacity: 0.12,
        });

        if (hasSublocality) {
          markerRef.current = new maps.Marker({
            map,
            position: center,
            title: query,
            icon: {
              path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
              fillColor: '#0B2C5C',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 1.5,
              scale: 1.6,
              anchor: new maps.Point(12, 22),
            },
          });
        }

        setResolvedLabel(place.formatted_address || query);
      });
    }, 450);

    return () => {
      window.clearTimeout(timer);
    };
  }, [location, sublocality, hasLocation, hasSublocality, mapReady]);

  const openLargerMap = () => {
    const query = encodeURIComponent(
      hasLocation ? buildQuery(location, sublocality) : 'Hyderabad, Telangana, India'
    );
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-semibold text-[#0B2C5C]">Where is your property located?</h4>
        <p className="text-xs text-slate-500 mt-1">
          An accurate location helps you connect with the right buyers
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-[280px] sm:h-[340px]">
        <div ref={mapRef} className="absolute inset-0" />

        <button
          type="button"
          onClick={openLargerMap}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer"
        >
          <Expand className="w-3.5 h-3.5" />
          View larger map
        </button>

        {!hasLocation && !mapError && (
          <div className="absolute inset-0 z-[5] flex items-center justify-center bg-white/55 backdrop-blur-[1px] pointer-events-none">
            <div className="flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#035096]" />
              Enter property location to highlight the area
            </div>
          </div>
        )}

        {mapError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50 px-6 text-center">
            <p className="text-sm text-slate-500">
              Map could not be loaded. Check your Google Maps API key configuration.
            </p>
          </div>
        )}
      </div>

      {resolvedLabel && (
        <p className="text-[11px] text-slate-500 flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#035096] shrink-0 mt-0.5" />
          <span>
            {hasSublocality
              ? `Pin placed at ${resolvedLabel}`
              : `Area highlighted around ${resolvedLabel}`}
          </span>
        </p>
      )}
    </div>
  );
};
