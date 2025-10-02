import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import {
  DEFAULT_ZOOM,
  DENMARK_LAT_LNG,
  COPENHAGEN_LAT_LNG,
} from "../constants";

function ClickCapture({ onClick }) {
  useMapEvent("click", (e) => onClick(e.latlng));
  return null;
}

export default function MapReactLeaflet() {
  const [clickPos, setClickPos] = useState(null);
  const clickMarkerRef = useRef(null);

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

  useEffect(() => {
    if (clickPos && clickMarkerRef.current) {
      clickMarkerRef.current.openPopup();
    }
  }, [clickPos]);

  return (
    <MapContainer center={DENMARK_LAT_LNG} zoom={DEFAULT_ZOOM} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />

      <Marker
        position={COPENHAGEN_LAT_LNG}
        eventHandlers={{ add: (e) => e.target.openPopup() }}
      >
        <Popup>Hello from Copenhagen!</Popup>
      </Marker>

      {clickPos && (
        <Marker position={clickPos} icon={handIcon} ref={clickMarkerRef}>
          <Popup>You clicked here!</Popup>
        </Marker>
      )}

      <ClickCapture onClick={setClickPos} />
    </MapContainer>
  );
}
