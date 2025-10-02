import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import MapReactLeaflet from "./components/MapReactLeaflet.jsx";
import FunWithMarkers from "./components/FunWithMarkers.jsx";
import DragableMarker from "./components/DragableMarker.jsx";

export default function App() {
  return (
    <main>
      <h1>Fun with markers</h1>
      <p>Try clicking on the map to add a marker</p>
      <MapReactLeaflet url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png">
        <FunWithMarkers />
      </MapReactLeaflet>
      <h1>Draggable marker</h1>
      <p>Try dragging the pin to reveal the name of the nearest city</p>
      <MapReactLeaflet>
        <DragableMarker />
      </MapReactLeaflet>
    </main>
  );
}
