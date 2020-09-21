import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import api from "../services/api";

import { Container, Table } from "reactstrap";

export default function RecentOperations() {
  const jwtRef = useRef();

  const [operations, setOperations] = useState([]);

  const getOperations = async () => {
    await api
      .get("/operations", {
        headers: {
          Authorization: `Bearer ${jwtRef.current}`,
        },
      })
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
    }
  }, []);

  return (
    <>
      <h4 style={{ margin: "20px" }}>Últimas 10 Movimentações:</h4>
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th> Barraca </th>
              <th> Produto </th>
              <th> Quantidade </th>
              <th> Operação </th>
              <th> Data/Hora </th>
            </tr>
          </thead>
          <tbody>
            {operations.map((operation) => (
              <tr key={operation.id}>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
