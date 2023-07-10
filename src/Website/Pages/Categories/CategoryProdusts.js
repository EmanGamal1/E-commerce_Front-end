import { useEffect, useState } from "react";
import { axiosInstance } from "Axios.js";
import { useParams } from "react-router";


const CategoryProducts  = () => {
    const [productData, setProductData] = useState([]);
    const { slug } = useParams();
    useEffect(() => {
        axiosInstance
          .get(`/categories/${slug}/products`)
          .then((response) => {
            if (response.data.status === "success") {
              setProductData(response.data.data);
              console.log(response.data.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      
      }, []);
      
       

    return(<>
    
    </>)
}
export default CategoryProducts;