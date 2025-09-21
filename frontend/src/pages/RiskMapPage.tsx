import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Rectangle,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import { AlertTriangle } from "lucide-react";
import { districtBounds } from "../data/districtBounds";
import districtData from "../data/districts.json";

// ✅ Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Disaster color mapping
const getColor = (tags: string[] = []) => {
  if (tags.includes("Flood")) return "blue";
  if (tags.includes("Fire")) return "red";
  if (tags.includes("Industrial")) return "green";
  if (tags.includes("Heatwave")) return "orange";
  if (tags.includes("Landslide")) return "brown";
  if (tags.includes("Drought")) return "yellow";
  if (tags.includes("Health")) return "purple";
  return "gray";
};

// Zoom helper
function FitBounds({ bounds }: { bounds: LatLngBoundsExpression | null }) {
  const map = useMap();
  React.useEffect(() => {
    if (bounds) {
      (map as any).fitBounds(bounds, { padding: [20, 20], maxZoom: 11 });
    }
  }, [bounds, map]);
  return null;
}

const RiskMapPage = () => {
  const punjabCenter: LatLngExpression = [31.1471, 75.3412];
  const [hoveredDistrict, setHoveredDistrict] = useState<any | null>(null);
  const [clickedBounds, setClickedBounds] =
    useState<LatLngBoundsExpression | null>(null);
  const [filter, setFilter] = useState<string>("All");

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border bg-card/50 backdrop-blur-xl">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-primary" />
          Punjab Risk Maps
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Hover or click a district to explore disaster risks.
        </p>
      </header>

      {/* Filter */}
      <div className="px-6 py-2 border-b flex gap-4 items-center">
        <label className="text-sm font-medium">Filter by Disaster:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="All">All</option>
          <option value="Flood">Flood</option>
          <option value="Fire">Fire</option>
          <option value="Industrial">Industrial</option>
          <option value="Heatwave">Heatwave</option>
          <option value="Landslide">Landslide</option>
          <option value="Drought">Drought</option>
          <option value="Health">Health</option>
          <option value="Preparedness">Preparedness</option>
          <option value="Border">Border</option>
          <option value="Agriculture">Agriculture</option>
        </select>
      </div>

      {/* Main content */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 p-6">
        {/* Map */}
        <div className="rounded-xl overflow-hidden border border-border shadow-md h-[78vh]">
          <MapContainer
            center={punjabCenter}
            zoom={7}
            minZoom={5}
            maxZoom={12}
            scrollWheelZoom
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {clickedBounds && <FitBounds bounds={clickedBounds} />}

            {Object.entries(districtBounds).map(([district, bounds]) => {
              const data = (districtData as any)[district] || {};
              if (
                filter !== "All" &&
                !(data.riskTags || []).includes(filter)
              ) {
                return null;
              }

              const color = getColor(data.riskTags);

              return (
                <Rectangle
                  key={district}
                  bounds={bounds as LatLngBoundsExpression}
                  pathOptions={{
                    color,
                    weight: 2,
                    fillOpacity: 0.3,
                    fillColor: color,
                  }}
                  eventHandlers={{
                    mouseover: () =>
                      setHoveredDistrict({ name: district, ...data }),
                    mouseout: () =>
                      setHoveredDistrict((prev) =>
                        prev?.name === district ? null : prev
                      ),
                    click: () => setClickedBounds(bounds),
                  }}
                >
                  {/* ✅ Show district name when hovering */}
                  <Tooltip sticky direction="top">
                    <span className="font-semibold">{district}</span>
                  </Tooltip>

                  <Popup>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{district}</h3>
                      <p className="text-sm text-muted-foreground">
                        {data.riskDescription || "No details available"}
                      </p>
                      <p>
                        <b>Risk:</b> {data.riskLevel} ({data.riskIntensity})
                      </p>
                      <p>
                        <b>Preparedness Score:</b>{" "}
                        {data.preparednessScore ?? "N/A"}
                      </p>
                      <p>
                        <b>Tags:</b> {(data.riskTags || []).join(", ")}
                      </p>
                      <em className="text-xs text-muted-foreground">
                        {data.safetyTip}
                      </em>
                    </div>
                  </Popup>
                </Rectangle>
              );
            })}
          </MapContainer>
        </div>

        {/* Side panel */}
        <aside className="bg-card rounded-xl border border-border p-4 h-[78vh] overflow-auto">
          <h2 className="text-lg font-semibold mb-2">District Details</h2>
          {!hoveredDistrict ? (
            <p className="text-sm text-muted-foreground">
              Hover over a district to see details here, or click to zoom in.
            </p>
          ) : (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">{hoveredDistrict.name}</h3>
              <p className="text-sm text-muted-foreground">
                {hoveredDistrict.riskDescription}
              </p>
              <p>
                <b>Risk Level:</b> {hoveredDistrict.riskLevel} (
                {hoveredDistrict.riskIntensity})
              </p>
              <p>
                <b>Preparedness Score:</b>{" "}
                {hoveredDistrict.preparednessScore ?? "N/A"}
              </p>
              <div className="flex flex-wrap gap-2">
                {(hoveredDistrict.riskTags || []).map((t: string) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      background: `${getColor([t])}22`,
                      color: getColor([t]),
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <em className="text-xs text-muted-foreground block">
                {hoveredDistrict.safetyTip}
              </em>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};

export default RiskMapPage;