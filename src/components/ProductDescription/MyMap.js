import Map, { Marker } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";
// import styles from "../../styles/map.module.css";

function MyMap() {
    
    const [viewport, setViewport] = useState({});
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setViewport({
                ...viewport,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 3.5,
            });
        });
    }, []);

    return (
        // <div className={styles.container}>
        <div>
                {viewport.latitude && viewport.longitude && (
                <div>
                    <h1>Product Location:</h1>
                    <Map
                        mapboxAccessToken="pk.eyJ1IjoiYXBlZG5layIsImEiOiJjbGZhY3VsbnIwNGF5M3hudzM5YTc3Zm9hIn0.rfcNbP6L2O0ijcc1smkXAg"
                        initialViewState={viewport}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                    >
                    <Marker
                    longitude={viewport.longitude}
                    latitude={viewport.latitude}
                    />
                    </Map>
                </div>
            )}
      </div>
    );
}

export default MyMap;