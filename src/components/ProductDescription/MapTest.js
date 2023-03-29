import ReactMapGL from "react-map-gl";
import Map, { Marker } from "react-map-gl";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
// import Container from "@mui/material/Container";
// import MapBoxGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapTest({ locations }) {
    const [viewport, setViewport] = useState({});
    useEffect(() => {
            setViewport({
                ...viewport,
                latitude: 51.5074,
                longitude: -0.1278,
                zoom: 3.5,
            });
        
    }, []);

    return(
        <div>
                {viewport.latitude && viewport.longitude && (
        <Map
        mapboxAccessToken="pk.eyJ1IjoiYXBlZG5layIsImEiOiJjbGZhY3VsbnIwNGF5M3hudzM5YTc3Zm9hIn0.rfcNbP6L2O0ijcc1smkXAg"
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        >
        {locations.map((location) => (
             <div key={location.id}>
                {/* {console.log(location[0].center[0] + " heyy")} */}
                {/* {console.log(location.center[1])} */}
                <Marker
                    latitude={location.center[1]}
                    longitude={location.center[0]}
                    // offsetLeft={-20}
                    // offsetTop={-10}>
                    >
                    {/* <span role="img" aria-label="push-pin">📌</span> */}
                </Marker>
             </div>
         ))}
        </Map>
        )}
        </div>
        );

}


// const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/greggs.json?access_token=${process.env.MAPBOX_KEY}&bbox=-0.227654%2C51.464102%2C0.060737%2C51.553421&limit=10`;
//const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/San%20Francisco.json?access_token=pk.eyJ1IjoiYXBlZG5layIsImEiOiJjbGZhY3VsbnIwNGF5M3hudzM5YTc3Zm9hIn0.rfcNbP6L2O0ijcc1smkXAg&bbox=-0.227654%2C51.464102%2C0.060737%2C51.553421&limit=10`;




/*
const LoadMap = dynamic(() => import("components/ProductDescription/Map"), {
    loading: () => "Loading...",
    ssr: false
});

// const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/greggs.json?access_token=${process.env.MAPBOX_KEY}&bbox=-0.227654%2C51.464102%2C0.060737%2C51.553421&limit=10`;
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/San%20Francisco.json?access_token=pk.eyJ1IjoiYXBlZG5layIsImEiOiJjbGZhY3VsbnIwNGF5M3hudzM5YTc3Zm9hIn0.rfcNbP6L2O0ijcc1smkXAg&bbox=-0.227654%2C51.464102%2C0.060737%2C51.553421&limit=10`;

export default function Map() {
    const [locations, setLocations] = useState([]);
    useEffect(() => {
    const fetchLocations = async () => {
        await fetch(url).then((response) =>
        response.text()).then((res) => JSON.parse(res))
        .then((json) => {
            setLocations(json.features);
        }).catch((err) => console.log({ err }));
    };
    fetchLocations();
  }, []);

  return (<Container>
    <LoadMap locations={locations} />
  </Container>);
}

*/