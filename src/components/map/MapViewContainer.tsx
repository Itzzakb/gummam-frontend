import React, { useState, useRef, useEffect } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface Hotspot {
  id: number;
  lat: number;
  lng: number;
  price: string;
  label: string;
  color: 'yellow' | 'orange' | 'red' | 'green';
}

interface MapViewContainerProps {
  center: { lat: number; lng: number };
  zoom: number;
  layerType: 'hybrid' | 'roadmap' | 'satellite';
  onMapChange: (lat: number, lng: number, zoom: number) => void;
  hoveredCoords: { lat: number; lng: number } | null;
}

// Generate consistent mock hotspot dots around Hyderabad coordinates
const generateHotspots = (): Hotspot[] => {
  const spots: Hotspot[] = [];
  const baseLat = 17.3850;
  const baseLng = 78.4867;
  
  let seed = 42;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < 120; i++) {
    const angle = random() * Math.PI * 2;
    const radius = 0.05 + random() * 0.45;
    const lat = baseLat + Math.sin(angle) * radius;
    const lng = baseLng + Math.cos(angle) * radius;
    const dist = Math.sqrt(Math.pow(lat - baseLat, 2) + Math.pow(lng - baseLng, 2));
    
    let color: 'yellow' | 'orange' | 'red' | 'green' = 'green';
    let priceVal = 0;
    let label = '';

    if (dist < 0.1) {
      color = 'red';
      priceVal = 5 + random() * 12;
      label = `${Math.floor(10 + random() * 40)} Sq Yds`;
    } else if (dist < 0.22) {
      color = 'orange';
      priceVal = 2.5 + random() * 3.5;
      label = `${Math.floor(10 + random() * 30)} Guntas`;
    } else if (dist < 0.38) {
      color = 'yellow';
      priceVal = 1.2 + random() * 1.5;
      label = `${Math.floor(1 + random() * 5)} Acres`;
    } else {
      color = 'green';
      priceVal = 0.3 + random() * 0.8;
      label = `${Math.floor(2 + random() * 15)} Acres`;
    }

    const price = priceVal >= 1 
      ? `₹${priceVal.toFixed(2)} Cr/Acre`
      : `₹${(priceVal * 100).toFixed(0)} Lakhs/Acre`;

    spots.push({
      id: i,
      lat,
      lng,
      price,
      label,
      color
    });
  }
  return spots;
};

// Simple hook/helper to load Google Maps SDK script dynamically
const loadGoogleMaps = (apiKey: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }
    const scriptId = 'google-maps-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (script) {
      script.addEventListener('load', () => resolve(window.google.maps));
      script.addEventListener('error', (e) => reject(e));
      return;
    }
    script = document.createElement('script');
    script.id = scriptId;
    // Reads environment key if available, otherwise runs with empty key (watermarked development map)
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
};

export const MapViewContainer: React.FC<MapViewContainerProps> = ({
  center,
  zoom,
  layerType,
  onMapChange,
  hoveredCoords
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const densityOverlayRef = useRef<any>(null);
  const hoveredMarkerRef = useRef<any>(null);
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [hotspots] = useState<Hotspot[]>(generateHotspots);

  // Initialize Map
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
    loadGoogleMaps(apiKey)
      .then((maps) => {
        if (!mapRef.current) return;
        
        // Setup Map Type translation
        let mapTypeId = maps.MapTypeId.HYBRID;
        if (layerType === 'roadmap') mapTypeId = maps.MapTypeId.ROADMAP;
        if (layerType === 'satellite') mapTypeId = maps.MapTypeId.SATELLITE;

        const mapInstance = new maps.Map(mapRef.current, {
          center: { lat: center.lat, lng: center.lng },
          zoom: zoom,
          mapTypeId: mapTypeId,
          disableDefaultUI: true, // Clean layout matching Figma
          zoomControl: false, // Custom styled zoom controls
          tilt: 0,
        });

        googleMapInstanceRef.current = mapInstance;
        setMapLoaded(true);

        // Bind drag and zoom events
        const updateParentCoords = () => {
          const newCenter = mapInstance.getCenter();
          const newZoom = mapInstance.getZoom();
          if (newCenter) {
            onMapChange(newCenter.lat(), newCenter.lng(), newZoom);
          }
        };

        mapInstance.addListener('dragend', updateParentCoords);
        mapInstance.addListener('zoom_changed', updateParentCoords);
      })
      .catch((err) => {
        console.error("Failed to load Google Maps SDK script:", err);
      });

    return () => {
      // Clear listeners
      if (window.google && window.google.maps && googleMapInstanceRef.current) {
        window.google.maps.event.clearInstanceListeners(googleMapInstanceRef.current);
      }
    };
  }, []);

  // Update center and zoom when props change from parents (synchronized carefully to prevent feedback loops)
  useEffect(() => {
    if (!mapLoaded || !googleMapInstanceRef.current) return;
    const map = googleMapInstanceRef.current;
    
    // Check threshold difference before setting map center to avoid drag jitter
    const currentCenter = map.getCenter();
    if (currentCenter) {
      const latDiff = Math.abs(currentCenter.lat() - center.lat);
      const lngDiff = Math.abs(currentCenter.lng() - center.lng);
      if (latDiff > 0.0001 || lngDiff > 0.0001) {
        map.setCenter({ lat: center.lat, lng: center.lng });
      }
    }

    if (map.getZoom() !== zoom) {
      map.setZoom(zoom);
    }
  }, [center.lat, center.lng, zoom, mapLoaded]);

  // Update Map Layer type
  useEffect(() => {
    if (!mapLoaded || !googleMapInstanceRef.current || !window.google) return;
    const map = googleMapInstanceRef.current;
    const maps = window.google.maps;

    let mapTypeId = maps.MapTypeId.HYBRID;
    if (layerType === 'roadmap') mapTypeId = maps.MapTypeId.ROADMAP;
    if (layerType === 'satellite') mapTypeId = maps.MapTypeId.SATELLITE;

    map.setMapTypeId(mapTypeId);
  }, [layerType, mapLoaded]);

  // Render/Update Hotspot markers on the Google Map
  useEffect(() => {
    if (!mapLoaded || !googleMapInstanceRef.current || !window.google) return;
    const map = googleMapInstanceRef.current;
    const maps = window.google.maps;

    // Clear old markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create styled price hotspots markers
    hotspots.forEach(spot => {
      let colorHex = '#eab308'; // yellow
      if (spot.color === 'orange') colorHex = '#f97316';
      if (spot.color === 'red') colorHex = '#ef4444';
      if (spot.color === 'green') colorHex = '#10b981';

      // SVG path circle marker icon
      const icon = {
        path: maps.SymbolPath.CIRCLE,
        fillColor: colorHex,
        fillOpacity: 0.95,
        scale: 7,
        strokeColor: '#ffffff',
        strokeWeight: 1.5,
      };

      const marker = new maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map: map,
        icon: icon,
        optimized: true,
      });

      marker.addListener('mouseover', () => {
        setActiveHotspot(spot);
        
        // Find screen coordinates using standard overlay map projection
        const projection = map.getProjection();
        if (projection) {
          const latLng = new maps.LatLng(spot.lat, spot.lng);
          // Scale math projection to get pixel values relative to the parent map wrapper
          const bounds = map.getBounds();
          if (bounds) {
            const topRight = projection.fromLatLngToPoint(bounds.getNorthEast());
            const bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest());
            const scale = Math.pow(2, map.getZoom());
            const worldPoint = projection.fromLatLngToPoint(latLng);
            
            const pxX = (worldPoint.x - bottomLeft.x) * scale;
            const pxY = (worldPoint.y - topRight.y) * scale;
            
            // Adjust position offsets
            setHoverPosition({ x: pxX, y: pxY });
          }
        }
      });

      marker.addListener('mouseout', () => {
        setActiveHotspot(null);
      });

      markersRef.current.push(marker);
    });

    // RENDER DENSITY OVERLAY: Glowing blue density listing count bubble
    // Place listing density circle `223` over Hyderabad Central
    const densityLat = 17.3950;
    const densityLng = 78.4550;

    // Use a custom HTML element overlay marker if modern AdvancedMarkers are supported,
    // otherwise use standard HTML overlay or custom marker with custom SVG icon
    // A clean circular SVG with text acts as a generic marker:
    const densitySvg = `data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="rgba(37, 99, 235, 0.35)" stroke="%233b82f6" stroke-width="2"/><circle cx="30" cy="30" r="18" fill="%232563eb" stroke="%23ffffff" stroke-width="1.5"/><text x="30" y="34" fill="%23ffffff" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">223</text></svg>`;

    if (densityOverlayRef.current) {
      densityOverlayRef.current.setMap(null);
    }

    const densityMarker = new maps.Marker({
      position: { lat: densityLat, lng: densityLng },
      map: map,
      icon: {
        url: densitySvg,
        size: new maps.Size(60, 60),
        origin: new maps.Point(0, 0),
        anchor: new maps.Point(30, 30),
      },
      zIndex: 999,
    });

    densityOverlayRef.current = densityMarker;

  }, [mapLoaded, hotspots]);

  // Render and update hoveredCoords bouncing pin marker
  useEffect(() => {
    if (!mapLoaded || !googleMapInstanceRef.current || !window.google) return;
    const map = googleMapInstanceRef.current;
    const maps = window.google.maps;

    // Clear old hovered marker
    if (hoveredMarkerRef.current) {
      hoveredMarkerRef.current.setMap(null);
      hoveredMarkerRef.current = null;
    }

    if (hoveredCoords) {
      // Create new custom yellow pin pointer marker
      const marker = new maps.Marker({
        position: hoveredCoords,
        map: map,
        icon: {
          path: maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          fillColor: '#f59e0b', // warm gold/yellow pin accent matching img2
          fillOpacity: 1,
          scale: 7,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        zIndex: 1000,
        animation: maps.Animation.BOUNCE,
      });

      // Pan map smoothly to focus on hovered listing coordinates
      map.panTo(hoveredCoords);

      hoveredMarkerRef.current = marker;
    }
  }, [hoveredCoords, mapLoaded]);

  // Handle zoom helpers
  const handleZoomIn = () => {
    if (!googleMapInstanceRef.current) return;
    const currentZoom = googleMapInstanceRef.current.getZoom();
    googleMapInstanceRef.current.setZoom(currentZoom + 1);
  };

  const handleZoomOut = () => {
    if (!googleMapInstanceRef.current) return;
    const currentZoom = googleMapInstanceRef.current.getZoom();
    googleMapInstanceRef.current.setZoom(currentZoom - 1);
  };

  return (
    <div className="relative w-full h-full">
      {/* Real Map Container for Google Maps SDK */}
      <div 
        ref={mapRef} 
        className="w-full h-full bg-[#0a101d]" 
      />

      {/* Floating Zoom Controls overlay */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
        <button 
          onClick={handleZoomIn}
          className="flex items-center justify-center w-11 h-11 bg-white hover:bg-gray-50 border border-gray-200/80 rounded-xl shadow-xl text-gray-700 active:scale-90 transition-all font-bold font-poppins"
          title="Zoom In"
        >
          +
        </button>
        <button 
          onClick={handleZoomOut}
          className="flex items-center justify-center w-11 h-11 bg-white hover:bg-gray-50 border border-gray-200/80 rounded-xl shadow-xl text-gray-700 active:scale-90 transition-all font-bold font-poppins"
          title="Zoom Out"
        >
          -
        </button>
      </div>

      {/* Hover Property Details popup Card */}
      {activeHotspot && (
        <div 
          className="absolute z-40 bg-[#f7f7f7] border border-gray-200 rounded-xl px-4 py-2.5 shadow-2xl text-[14px] font-bold text-gray-800 pointer-events-none transform -translate-x-1/2 -translate-y-full flex flex-col items-center select-none"
          style={{
            left: hoverPosition.x,
            top: hoverPosition.y - 15,
          }}
        >
          <div className="whitespace-nowrap flex items-center gap-1 text-slate-800">
            <span className="font-medium text-slate-500 mr-0.5">{activeHotspot.label}</span>
            <span>-</span>
            <span className="text-[#0B2C5C] font-extrabold">{activeHotspot.price}</span>
          </div>
          {/* Small Arrow down */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#f7f7f7] border-r border-b border-gray-200 rotate-45" />
        </div>
      )}
    </div>
  );
};
