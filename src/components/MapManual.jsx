import { useEffect, useRef } from "react";
import L from "leaflet";

export default function MapManual() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView(
      [56.155403, 11.617223],
      7
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.marker([55.6761, 12.5683])
      .addTo(map)
      .bindPopup("Hello from Copenhagen!")
      .openPopup();

    const handIcon = L.divIcon({
      className: "",
      html: `
        <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <text x="18" y="28" text-anchor="middle" style="font-size:28px;">👇</text>
        </svg>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 30],
      popupAnchor: [0, -28],
    });

    let clickMarker = null;
    const handleClick = (e) => {
      if (clickMarker) {
        clickMarker.remove();
      }
      clickMarker = L.marker(e.latlng, { icon: handIcon })
        .addTo(map)
        .bindPopup("You clicked here!")
        .openPopup();
    };
    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
      map.remove();
    };
  }, []);

  return <div ref={mapContainerRef} className="map" />;
}
