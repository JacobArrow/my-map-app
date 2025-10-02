import { useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";
import L from "leaflet";
import { COPENHAGEN_LAT_LNG } from "../constants";

function ClickCapture({ onClick }) {
  useMapEvent("click", (e) => onClick(e.latlng));
  return null;
}

export default function FunWithMarkers() {
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

  const copenhagenIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/12461/12461223.png",
        iconSize: [32, 32],
        iconAnchor: [16, 30],
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
    <>
      <Marker
        position={COPENHAGEN_LAT_LNG}
        icon={copenhagenIcon}
        eventHandlers={{ add: (e) => e.target.openPopup() }}
      >
        <Popup>Hello from Copenhagen! 👋</Popup>
      </Marker>

      {clickPos && (
        <Marker position={clickPos} icon={handIcon} ref={clickMarkerRef}>
          <Popup>📍 You clicked here!</Popup>
        </Marker>
      )}

      <ClickCapture onClick={setClickPos} />
    </>
  );
}
