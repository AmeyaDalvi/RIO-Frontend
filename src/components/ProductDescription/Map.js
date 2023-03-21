import ReactMapGL from "react-map-gl";
import dynamic from "next/dynamic";
import { useState } from "react";
// import Container from "@mui/material/Container";
import MapBoxGL, { Marker } from "react-map-gl";

export default function Map({ locations }) {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        // The latitude and longitude of the center of London
        latitude: 51.5074,
        longitude: -0.1278,
        pitch: 0,
        zoom: 10
    });

    return(
        <ReactMapGL
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken="pk.eyJ1IjoiYXBlZG5layIsImEiOiJjbGZhY3VsbnIwNGF5M3hudzM5YTc3Zm9hIn0.rfcNbP6L2O0ijcc1smkXAg"
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
        {locations.map((location) => (
            <div key={location.id}>
                {console.log(locations)}
                <Marker
                    latitude={location.center[1]}
                    longitude={location.center[0]}
                    offsetLeft={-20}
                    offsetTop={-10}>
                    <span role="img" aria-label="push-pin">📌</span>
                </Marker>
            </div>
        ))}
        </ReactMapGL>
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