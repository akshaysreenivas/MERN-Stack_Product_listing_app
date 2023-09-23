import React, { useEffect, useState } from "react";
import { getProducts } from "../axios";
import { toast } from "react-toastify";

function ListProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      console.log(data);
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="d-flex justify-content-center py-5 px-4">
     <div>
     <h1>Products</h1>
      <ul className="mt-2">
        {products && products.map((Product) => (
          <li key={Product._id}>{Product.name}</li>
        ))}
      </ul>
     </div>
    </div>
  );
}

export default ListProducts;
