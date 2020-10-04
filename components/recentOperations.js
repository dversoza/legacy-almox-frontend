import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import api from "../services/api";

import { Container, Table, Button, Input } from "reactstrap";

export default function RecentOperations() {
  const jwtRef = useRef();
  const vendorRef = useRef();
  const productRef = useRef();

  const [operations, setOperations] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);

  const getOperations = async () => {
    await api
      .get("/operations?IsDeleted=false&_sort=date:DESC", {
        headers: {
          Authorization: `Bearer ${jwtRef.current}`,
        },
      })
      .then(function (res) {
        setOperations(res.data);
      });
  };

  const getVendors = async () => {
    await api
      .get("/vendors", {
        headers: {
          Authorization: `Bearer ${jwtRef.current}`,
        },
      })
      .then(function (res) {
        setVendors(res.data);
      });
  };

  const getProducts = async () => {
    await api
      .get("/products", {
        headers: {
          Authorization: `Bearer ${jwtRef.current}`,
        },
      })
      .then(function (res) {
        setProducts(res.data);
      });
  };

  const handleSelectVendor = async () => {
    const vendorId = vendorRef.current.value.split(" - Cód.: ")[1];

    await api
      .get(
        `/operations?IsDeleted=false&_sort=date:DESC&vendor.id=${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtRef.current}`,
          },
        }
      )
      .then(function (res) {
        setOperations(res.data);
      });
  };

  const handleSelectProduct = async () => {
    const productId = productRef.current.value.split(" - Cód.: ")[1];

    await api
      .get(
        `/operations?IsDeleted=false&_sort=date:DESC&product.id=${productId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtRef.current}`,
          },
        }
      )
      .then(function (res) {
        setOperations(res.data);
      });
  };

  useEffect(() => {
    const jwt = window.sessionStorage.getItem("jwt");
    if (!jwt) {
      Router.push("/login");
    } else {
      jwtRef.current = jwt;
      getOperations();
      getVendors();
      getProducts();
    }
  }, []);

  const handleDeleteOperation = async (op) => {
    const IsDeleted = true;

    await api.put(
      `/operations/${op}`,
      JSON.stringify({
        IsDeleted,
      }),
      {
        headers: {
          Authorization: `Bearer ${jwtRef.current}`,
          "Content-Type": "application/json",
        },
      }
    );
    getOperations();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "20px",
          justifyContent: "space-between",
        }}
      >
        <h4>Últimas Movimentações:</h4>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <h6>Filtrar por barraca: </h6>{" "}
          <Button close onClick={() => getOperations()} />
          <Input
            onInput={() => handleSelectVendor()}
            type="select"
            name="select"
            id="isSelect"
            innerRef={vendorRef}
          >
            {vendors.map((vendor) => (
              <option key={vendor.name}>
                {vendor.name} - Cód.: {vendor.id}
              </option>
            ))}
          </Input>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <h6>Filtrar por produto: </h6>{" "}
          <Button close onClick={() => getOperations()} />
          <Input
            onInput={() => handleSelectProduct()}
            type="select"
            name="select"
            id="isSelect"
            innerRef={productRef}
          >
            {products.map((product) => (
              <option key={product.name}>
                {product.name} - Cód.: {product.id}
              </option>
            ))}
          </Input>
        </div>
      </div>

      <Container>
        <Table striped>
          <thead>
            <tr>
              <th> ID </th>
              <th> Barraca </th>
              <th> Produto </th>
              <th> Quantidade </th>
              <th> Operação </th>
              <th> Data/Hora </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {operations.map((operation) => (
              <tr key={operation.id}>
                <th tag="h5">{operation.id}</th>
                <th tag="h5">{operation.vendor?.name}</th>
                <th tag="h5">{operation.product?.name}</th>
                <th tag="h5">
                  {operation.quantity} {operation.product?.um}
                </th>
                <th tag="h5">{operation.op}</th>
                <th tag="h5">
                  {new Intl.DateTimeFormat("pt-br", {
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(new Date(operation.date))}
                </th>
                <th>
                  <Button
                    close
                    onClick={() => handleDeleteOperation(operation.id)}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
