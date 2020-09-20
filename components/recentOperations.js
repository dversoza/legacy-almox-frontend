import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import api from "../services/api";

import {
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
} from "reactstrap";

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
        console.log(res.data);
      });
  };

  useEffect(() => {
    const jwt = window.sessionStorage.getItem("jwt");
    if (!jwt) {
      Router.push("/login");
    }
    jwtRef.current = jwt;
    getOperations();
  }, []);

  return (
    <>
      <h2 style={{ margin: "20px" }}>Últimas Movimentações:</h2>
      <Container>
        <Row xs="2">
          {operations.map((operation) => (
            <Col md={4} key={operation.id}>
              <Card key={operation.id}>
                <CardHeader tag="h5">{operation.vendor?.name}</CardHeader>
                <CardBody>
                  <CardTitle>
                    {operation.product?.name} x {operation.quantity}
                  </CardTitle>
                  <CardText>
                    {operation.op} / {operation.type}
                  </CardText>
                </CardBody>
                <CardFooter>
                  {new Intl.DateTimeFormat("pt-br", {
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(new Date(operation.date))}
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
