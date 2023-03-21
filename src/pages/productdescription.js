//import Map from 'components/ProductDescription/Map'
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";


const Map = dynamic(() => import("components/ProductDescription/Map"), {
    loading: () => "Loading...",
    ssr: true
});

const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/greggs.json?access_token=pk.eyJ1IjoiYXBlZG5layIsImEiOiJjbGZhY3VsbnIwNGF5M3hudzM5YTc3Zm9hIn0.rfcNbP6L2O0ijcc1smkXAg&bbox=-0.227654%2C51.464102%2C0.060737%2C51.553421&limit=10`;

/*
const map = () => {
    return <Map/>;
};
*/

export default function ProductDescription() {
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

    return (
        <Container>
            <Map locations={locations} />
        </Container>
    );
}