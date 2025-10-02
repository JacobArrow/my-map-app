import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { AARHUS_LAT_LNG } from "../constants";

async function reverseGeocodeNearestCity(latitude, longitude) {
  const params = new URLSearchParams({
    format: "jsonv2",
    lat: String(latitude),
    lon: String(longitude),
    zoom: "10",
    addressdetails: "1",
  });
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "my-map-app (contact: me@email.com)", // to comply with Nominatim usage policy
        Referer: "my-map-app",
      },
    }
  );
  if (!response.ok)
    throw new Error(`Reverse geocode failed: ${response.status}`);
  const data = await response.json();
  const address = data.address || {};
  return (
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.county ||
    data.display_name ||
    "Unknown"
  );
}

export default function DragableMarker() {
  const [position, setPosition] = useState(AARHUS_LAT_LNG);
  const [cityName, setCityName] = useState("Drag me to find nearest city");
  const markerRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const name = await reverseGeocodeNearestCity(
          AARHUS_LAT_LNG[0],
          AARHUS_LAT_LNG[1]
        );
        setCityName(name);
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      } catch {
        // ignore
      }
    })();
  }, []);

  const handleDragEnd = useCallback(async () => {
    const marker = markerRef.current;
    if (!marker) return;
    const { lat, lng } = marker.getLatLng();
    setPosition([lat, lng]);
    try {
      const name = await reverseGeocodeNearestCity(lat, lng);
      setCityName(name);
      marker.openPopup();
    } catch {
      setCityName("Reverse geocoding failed");
    }
  }, []);

  const handIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `
          <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <text x="18" y="28" text-anchor="middle" style="font-size:28px;">👇</text>
          </svg>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 30],
        popupAnchor: [0, -28],
      }),
    []
  );

  return (
    <Marker
      position={position}
      draggable
      icon={handIcon}
      ref={markerRef}
      eventHandlers={{ dragend: handleDragEnd }}
    >
      <Popup>
        <strong>{cityName}</strong>
      </Popup>
    </Marker>
  );
}
