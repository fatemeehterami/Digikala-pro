import { useState,useEffect } from "react";
import { fetchProduct } from "../../services/products";

export default function Product() {
      const [product , setProduct] = useState([])
    
      useEffect(() => {
        const getProduct = async () => {
            try {
              const data = await fetchProduct(1,10);
              console.log(data.result);
              setProduct(data.result);
              
            } catch (err) {
                console.error(err)
            }
        }
        getProduct()
    }, [])
    return (
        <div className="grid grid-cols-5">

        </div>
    )
}
  
  