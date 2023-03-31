import Container from "@mui/material/Container";
import Description from "components/Description/Description"

const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/123%20Main%20St%20Boston%20MA.json?country=US&access_token=pk.eyJ1IjoiYXBlZG5layIsImEiOiJjbGZhY3VsbnIwNGF5M3hudzM5YTc3Zm9hIn0.rfcNbP6L2O0ijcc1smkXAg";

export default function ProductDescription() {

    return (
        <Container>
                <Description/>
        </Container>
    );
}