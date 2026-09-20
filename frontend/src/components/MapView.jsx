import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { StatusBadge } from './StatusBadge';
import { ExternalLink, MapPin } from 'lucide-react';

// Fix Leaflet icon broken default path in React apps
delete L.Icon.Default.prototype._getIconUrl;

const createCustomIcon = (status = 'Reported') => {
  let color = '#38bdf8'; // sky
  if (status === 'In Progress' || status === 'Assigned') color = '#f59e0b'; // amber
  if (status === 'Fixed') color = '#10b981'; // emerald
  if (status === 'Verified') color = '#14b8a6'; // teal

  const svgMarker = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34">
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.5"/>
      </filter>
      <path fill="${color}" filter="url(#shadow)" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;

  return L.divIcon({
    className: 'custom-leaflet-pin',
    html: svgMarker,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32]
  });
};

// Component to handle pin location selection on map click
function LocationMarker({ selectedPosition, onPositionSelect }) {
  useMapEvents({
    click(e) {
      onPositionSelect({
        lat: Number(e.latlng.lat.toFixed(5)),
        lng: Number(e.latlng.lng.toFixed(5)),
        address: `Marker Geotag (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`
      });
    },
  });

  return selectedPosition ? (
    <Marker 
      position={[selectedPosition.lat, selectedPosition.lng]} 
      icon={createCustomIcon('Reported')}
    >
      <Popup>
        <div className="p-1">
          <p className="font-semibold text-xs text-sky-400">Selected Incident Location</p>
          <p className="text-xs text-slate-300 mt-1">Lat: {selectedPosition.lat}, Lng: {selectedPosition.lng}</p>
        </div>
      </Popup>
    </Marker>
  ) : null;
}

// Map Auto-recenter helper
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom(), { animate: true });
    }
  }, [center, map]);
  return null;
}

export const MapView = ({ 
  issues = [], 
  selectable = false, 
  selectedPosition = null, 
  onPositionSelect = null,
  onSelectIssue = null,
  height = "420px",
  zoom = 13,
  center = [37.7749, -122.4194]
}) => {
  return (
    <div style={{ height }} className="w-full relative rounded-xl overflow-hidden border border-slate-800 shadow-xl">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapRecenter center={center} />

        {selectable && onPositionSelect && (
          <LocationMarker 
            selectedPosition={selectedPosition} 
            onPositionSelect={onPositionSelect} 
          />
        )}

        {!selectable && issues.map(issue => {
          if (!issue.location?.lat || !issue.location?.lng) return null;
          
          return (
            <Marker
              key={issue.id}
              position={[issue.location.lat, issue.location.lng]}
              icon={createCustomIcon(issue.status)}
            >
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {issue.id}
                    </span>
                    <StatusBadge status={issue.status} size="sm" />
                  </div>

                  {issue.image && (
                    <img 
                      src={issue.image} 
                      alt={issue.title} 
                      className="w-full h-24 object-cover rounded-lg mb-2 border border-slate-700/50" 
                    />
                  )}

                  <h4 className="font-semibold text-xs text-slate-100 line-clamp-1 mb-1">
                    {issue.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                    <span className="truncate">{issue.location.address}</span>
                  </p>

                  {onSelectIssue && (
                    <button
                      onClick={() => onSelectIssue(issue.id)}
                      className="w-full py-1.5 px-3 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-md flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>View Incident</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

