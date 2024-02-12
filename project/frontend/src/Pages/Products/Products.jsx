import React, { useEffect, useState } from "react";
// import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import AddNewProducts from "../../Components/AddNewProducts/AddNewProducts";
import ProductsTable from "../../Components/ProductsTable/ProductsTable";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";

export default function Products() {
  // ///////////////////lifting up++++++++++++++++++++++++
  const [allProducts, setAllProducts] = useState([]);
  async function getAllProducts() {
    try {
      const response = await fetch("http://localhost:8000/api/products");
      const result = await response.json();
      setAllProducts(result);
    } catch (error) {
      console.log(error);
    }
  }
  //میگیم که این کامپوننت که مانت شد بیاد کل محصولات رو گت کنه
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <AddNewProducts getAllProducts={getAllProducts} />
      <ProductsTable
        allProducts={allProducts}
        getAllProducts={getAllProducts}
      />
    </>
  );
}
