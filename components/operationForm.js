import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import api from "../services/api";

import { Alert, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";

export default function OperationForm() {
  const jwtRef = useRef();

  const dateRef = useRef();
  const timeRef = useRef();
  const vendorRef = useRef();
  const opRef = useRef();
  const typeRef = useRef();
  const productRef = useRef();
  const quantityRef = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const jwt = window.sessionStorage.getItem("jwt");
    if (!jwt) {
      Router.push("/login");
    } else {
      jwtRef.current = jwt;
      getProducts();
      getVendors();
    }
  }, []);

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

  const createOperation = async () => {
    const user = JSON.parse(window.sessionStorage.getItem("user")).id;
    const onlyDate = dateRef.current.value;
    const onlyTime = timeRef.current.value;
    const date = onlyDate + " " + onlyTime;
    const vendor = vendorRef.current.value.split(" - Cód.: ")[1];
    const op = opRef.current.value;
    const type = typeRef.current.value;
    const product = productRef.current.value.split(" - Cód.: ")[1];
    const quantity = quantityRef.current.value;

    if (!onlyDate) {
      setSuccess("");
      setError("Preencha a data da movimentação!");
      return;
    }

    if (!onlyTime) {
      setSuccess("");
      setError("Preencha o horário da movimentação!");
      return;
    }

    if (!quantity) {
      setSuccess("");
      setError("Preencha a quantidade!");
      return;
    }

    await api
      .post(
        "/operations",
        JSON.stringify({
          date,
          user,
          vendor,
          op,
          type,
          product,
          quantity,
        }),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtRef.current}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          if (response.status == 200) {
            setError("");
            setSuccess("Movimentação cadastrada com sucesso!");
          }
          console.log(response);
        },
        (error) => {
          setError(error);
          console.log(error);
        }
      );
  };

  return (
    <>
      <h2 style={{ margin: "20px 0 " }}>Nova movimentação</h2>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleDate">Data</Label>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
              innerRef={dateRef}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleTime">Hora</Label>
            <Input
              type="time"
              name="time"
              id="exampleTime"
              placeholder="time placeholder"
              innerRef={timeRef}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleSelect">Barraca</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              innerRef={vendorRef}
            >
              {vendors.map((vendor) => (
                <option key={vendor.name}>
                  {vendor.name} - Cód.: {vendor.id}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleSelect">Operação</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              innerRef={opRef}
            >
              <option>Entrada</option>
              <option>Saida</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleSelect">Tipo</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              innerRef={typeRef}
            >
              <option>Interna</option>
              <option>Compra</option>
              <option>Doacao</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={8}>
          <FormGroup>
            <Label for="exampleSelect">Produto</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              innerRef={productRef}
            >
              {products.map((product) => (
                <option key={product.name}>
                  {product.name} ({product.um.name}) - Cód.: {product.id}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleTime">Quantidade</Label>
            <Input
              type="number"
              name="time"
              id="exampleTime"
              placeholder="Quantidade"
              innerRef={quantityRef}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary" size="lg" block onClick={() => createOperation()}>
        Cadastrar Movimentação
      </Button>

      {error && (
        <Alert color="danger" style={{ marginTop: 20 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert color="success" style={{ marginTop: 20 }} timeout={5}>
          {success}
        </Alert>
      )}
    </>
  );
}
