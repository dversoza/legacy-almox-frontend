import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import api from "../services/api";

import { Alert, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";

export default function OperationForm() {
  const jwtRef = useRef();

  const dateRef = useRef();
  const timeRef = useRef();
  const vendorRef = useRef();
  const productRef = useRef();
  const quantityRef = useRef();
  const takerRef = useRef();

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
      .get("/products?_sort=name:ASC&_limit=300", {
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
      .get("/vendors?_sort=name:ASC&id_ne=1", {
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
    const op = "Saida";
    const type = "Interna";
    const product = productRef.current.value.split(" - Cód.: ")[1];
    const quantity = quantityRef.current.value;
    const taker = takerRef.current.value;

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
          taker,
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
      <h2 style={{ margin: "20px 0 " }}>Cadastrar saída do almoxarifado</h2>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="isDate">Data</Label>
            <Input
              type="date"
              name="date"
              id="isDate"
              placeholder="date placeholder"
              innerRef={dateRef}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="isTime">Hora</Label>
            <Input
              type="time"
              name="time"
              id="isTime"
              placeholder="time placeholder"
              innerRef={timeRef}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="isSelect">Barraca</Label>
            <Input
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
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="isSelect">Responsável pela retirada</Label>
            <Input
              name="input"
              id="takerInput"
              innerRef={takerRef}
              placeholder="Nome"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={7}>
          <FormGroup>
            <Label for="isSelect">Produto</Label>
            <Input
              type="select"
              name="select"
              id="isSelect"
              innerRef={productRef}
            >
              {products.map((product) => (
                <option key={product.name}>
                  {product.name} ({product.um}) - Cód.: {product.id}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <Label for="isTime">Quantidade</Label>
            <Input
              type="number"
              name="time"
              id="isTime"
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
