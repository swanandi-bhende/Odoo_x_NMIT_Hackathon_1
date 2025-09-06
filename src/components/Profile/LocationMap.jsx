import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issue with bundlers like Vite
// This prevents the "src" attribute from being missing on the marker image.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// A component to handle all map events and marker logic.
// It lives inside MapContainer, so it has access to the map instance.
const MapEventsAndMarker = ({ initialPosition, onPositionChange }) => {
  const [position, setPosition] = useState(initialPosition);
  const markerRef = useRef(null);
  const map = useMap();

  // Update the view and marker position if the parent prop changes
  // (e.g., from initial geolocation or loading user data)
  useEffect(() => {
    setPosition(initialPosition);
    map.setView(initialPosition, map.getZoom());
  }, [initialPosition, map]);

  // Handle map click events
  useMapEvents({
    click(e) {
      const newPos = e.latlng;
      setPosition(newPos);
      onPositionChange(newPos);
    },
  });

  // Handle marker drag events
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setPosition(newPos);
          onPositionChange(newPos);
        }
      },
    }),
    [onPositionChange],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};

// The main map component, wrapped in React.memo to prevent unnecessary re-renders.
const LocationMap = ({ lat, lng, onLocationChange }) => {
  // Memoize the initial position to ensure it's stable across parent re-renders.
  const initialPosition = useMemo(() => ({ lat, lng }), [lat, lng]);

  // Attempt to get user's location, but only on the initial mount.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Only update if the location is the default one, to avoid overriding a user's saved location.
          if (lat === 51.505 && lng === -0.09) {
            onLocationChange({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          }
        },
        () => {
          console.log("Geolocation permission denied. Using default location.");
        },
        { timeout: 5000 }
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLocationChange]); // We only want this to run once.

  return (
    // The MapContainer is the sensitive component. We give it a stable center prop.
    <MapContainer center={initialPosition} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEventsAndMarker 
        initialPosition={initialPosition} 
        onPositionChange={onLocationChange} 
      />
    </MapContainer>
  );
};

export default React.memo(LocationMap);
