import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import MapReactLeaflet from "./components/MapReactLeaflet.jsx";

export default function App() {
  return (
    <main>
      <h1>My Map</h1>
      <MapReactLeaflet />
    </main>
  );
}
