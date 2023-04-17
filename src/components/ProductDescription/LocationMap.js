import { GoogleMap, LoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { useMemo, useState } from "react";

const LocationMap = ({ lat, lon }) => {
  const [map, setMap] = useState(null);
  // const [center, setCenter] = useState(null);
  console.log("lat", lat);
  console.log("lon", lon);
  const mapCenter = { lat: Number(lat), lng: Number(lon) };
  console.log(location);
  const onLoad = (map) => {
    setMap(map);

    // setTimeout(() => {

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK") {
        // const { lat, lng } = results[0].geometry.location;
        setLat(results[0].geometry.location.lat());
        setLng(results[0].geometry.location.lng());
        // center.lat = parseFloat();
        // center.lng = parseFloat();
        // setCenter({ lat, lng });
        // console.log("hiiiii")
        // console.log(center.lat);
        // console.log(center.lng);
        // console.log("ayee")
        new google.maps.Marker({
          position: mapCenter,
          map,
        });

        map.setCenter(mapCenter);
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
    // },2000);
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
        // onLoad={() => onLoad}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          // center={center && <Map center={center} />}
          center={mapCenter}
          zoom={20}
          onLoad={onLoad}
        >
          {/* <Marker position={center} /> */}
          {<MarkerF position={mapCenter} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationMap;
