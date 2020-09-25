import React, { useEffect, useRef } from "react";
import Router from "next/router";

import ProductForm from "../components/productForm";

const NewProduct = () => {
  const jwtRef = useRef();

  useEffect(() => {
    const jwt = window.sessionStorage.getItem("jwt");
    if (!jwt) {
      Router.push("/login");
    }
    jwtRef.current = jwt;
  }, []);

  return (
    <>
      <ProductForm />
    </>
  );
};

export default NewProduct;
