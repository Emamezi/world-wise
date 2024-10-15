import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { replace, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../../Context/CitiesContext";
import Button from "../Button/Button";
import { useGeolocation } from "../../Hooks/UseGeolocation";
import useUrlPosition from "../../Hooks/useUrlPosition";

function Map() {
  const [mapPosition, setMapPosition] = useState([
    38.727881642324164, -9.140900099907554,
  ]);
  const { cities } = useCities();
  const {
    isLoading: isGeoLoading,
    position: geoPosition,
    getLocation,
    setPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (!mapLat && !mapLng) return;
    setMapPosition([mapLat, mapLng]);
    setPosition(null);
  }, [mapLat, mapLng, setPosition]);

  useEffect(() => {
    if (geoPosition && geoPosition.lat && geoPosition.lat)
      setMapPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getLocation}>
          {isGeoLoading ? "Loading..." : "Use Location"}
        </Button>
      )}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span> {city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <SetNewLocation />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function SetNewLocation() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default Map;
