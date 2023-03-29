// import MapTest from 'components/ProductDescription/MapTest'
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import MyMap from "components/ProductDescription/MyMap";
import { Route, Switch, BrowserRouter } from 'react-router-dom'
// import { Description } from "@mui/icons-material";
import Description from "components/Description/Description"
// import SearchableMap from "components/ProductDescription/SearchableMap";

const MapTest = dynamic(() => import("components/ProductDescription/MapTest"), {
    loading: () => "Loading...",
    ssr: true
});

// const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?access_token=pk.eyJ1IjoiYXBlZG5layIsImEiOiJjbGZhY3VsbnIwNGF5M3hudzM5YTc3Zm9hIn0.rfcNbP6L2O0ijcc1smkXAg&bbox=-0.227654%2C51.464102%2C0.060737%2C51.553421&limit=10`;
const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/123%20Main%20St%20Boston%20MA.json?country=US&access_token=pk.eyJ1IjoiYXBlZG5layIsImEiOiJjbGZhY3VsbnIwNGF5M3hudzM5YTc3Zm9hIn0.rfcNbP6L2O0ijcc1smkXAg";
/*
const map = () => {
    return <Map/>;
};
*/

export default function ProductDescription() {
    // const [locations, setLocations] = useState([]);
    // useEffect(() => {
    //     const fetchLocations = async () => {
    //         await fetch(url).then((response) =>
    //         response.text()).then((res) => JSON.parse(res))
    //         .then((json) => {
    //             setLocations(json.features[0]);
    //         }).catch((err) => console.log({ err }));
    //     };
    // fetchLocations();
    // }, []);

    return (
        // <Container>
        //     <MapTest locations={locations} />
        // </Container>
        <Container>
            {/* <div> */}
                <Description/>
            {/* </div> */}
           {/* <div> */}
                <MyMap />
            {/* </div> */}
        </Container>
        // <div>
        //     <SearchableMap />
        // </div>
    );
}