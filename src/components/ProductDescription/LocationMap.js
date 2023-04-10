import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const LocationMap = ({ location }) => {
  const [map, setMap] = useState(null);
  // const [center, setCenter] = useState(null);
  const center = { lat: 0.0, lng: 0.0 };
  console.log(location);
  const onLoad = (map) => {
    setMap(map);

    // setTimeout(() => {

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK") {
        // const { lat, lng } = results[0].geometry.location;
        center.lat = results[0].geometry.location.lat();
        center.lng = results[0].geometry.location.lng();
        // setCenter({ lat, lng });
        // console.log("hiiiii")
        console.log(center.lat);
        console.log(center.lng);
        // console.log("ayee")
        new google.maps.Marker({
          position: center,
          map,
        });

        map.setCenter(center);
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
    <div style={{ width: "100%", height: "500px" }}>
      <LoadScript
        googleMapsApiKey="AIzaSyAp-O3TH6q8MwUykZeds32EyxW1twK7-t0"
        onLoad={() => onLoad}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center && <Map center={center} />}
          // center={center}
          zoom={20}
          onLoad={onLoad}
        >
          <Marker position={center} />
          {/* {center && <Marker position={center} />} */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationMap;
