import { MapContainer, TileLayer } from "react-leaflet";
import { DEFAULT_ZOOM, DENMARK_LAT_LNG } from "../constants";
export default function MapReactLeaflet({
  children,
  url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
}) {
  return (
    <MapContainer center={DENMARK_LAT_LNG} zoom={DEFAULT_ZOOM} className="map">
      <TileLayer url={url} maxZoom={19} />
      {children}
    </MapContainer>
  );
}
