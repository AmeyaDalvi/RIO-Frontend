import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const url = "localhost:5000/getproduct"

export default function Description() {

    const router = useRouter();
    // const { productId } = router.query;

    const [product, setProduct] = useState(0);
    const [productId] = useState(1);
    

    useEffect(() => {console.log("test") 
        fetchProduct(productId);
        setProduct({})
    }, [productId]);
    // useEffect(() => {fetchProduct});

    let fetchProduct = (productId) => {
        fetch(`http://localhost:5000/getproduct?productid=${productId}`)
        .then((response) => response.json())
        .then((response) => {
        setProduct(response[0]);
        console.log(productId , response[0]);
      });
    };


    return(
        <div className={styles.container}>
            <div>
                <h2>{product.Name}</h2>
                <p>Price: ${product.Price}</p>
                <p>{product.Description}</p>
            </div>
            {/* {
                product.ProductId ? (
                    <h2>{product.name}</h2>
                ) : null
            } */}
        </div>
    );
}