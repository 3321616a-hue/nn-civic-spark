import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Appeal, categoryColors, categoryLabels, statusLabels } from "@/data/appeals";

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
}

interface CityMapProps {
  appeals: Appeal[];
  selectedAppeal?: Appeal | null;
  onAppealClick?: (appeal: Appeal) => void;
}

const CityMap = ({ appeals, selectedAppeal, onAppealClick }: CityMapProps) => {
  const center: [number, number] = [56.2965, 43.9361];

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-border/50">
      <MapContainer
        center={center}
        zoom={12}
        className="w-full h-full"
        style={{ background: "hsl(220, 30%, 8%)" }}
      >
        <MapController center={selectedAppeal ? [selectedAppeal.lat, selectedAppeal.lng] : center} />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {appeals.map((appeal) => (
          <CircleMarker
            key={appeal.id}
            center={[appeal.lat, appeal.lng]}
            radius={selectedAppeal?.id === appeal.id ? 12 : 8}
            fillColor={categoryColors[appeal.category]}
            color={selectedAppeal?.id === appeal.id ? "#fff" : categoryColors[appeal.category]}
            weight={selectedAppeal?.id === appeal.id ? 3 : 1.5}
            opacity={0.9}
            fillOpacity={0.7}
            eventHandlers={{
              click: () => onAppealClick?.(appeal),
            }}
          >
            <Popup>
              <div className="text-sm min-w-[200px]">
                <p className="font-bold text-gray-900 mb-1">{appeal.title}</p>
                <p className="text-gray-600 text-xs mb-2">{appeal.description}</p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: categoryColors[appeal.category] + "30", color: categoryColors[appeal.category] }}>
                    {categoryLabels[appeal.category]}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {statusLabels[appeal.status]}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-2">👍 {appeal.votes} голосов</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CityMap;
