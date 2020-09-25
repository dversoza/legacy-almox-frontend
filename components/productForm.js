import React, { useRef, useState } from "react";
import api from "../services/api";

import { Alert, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";

export default function ProductForm() {
  const jwtRef = useRef();

  const nameRef = useRef();
  const umRef = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const createProduct = async () => {
    const user = JSON.parse(window.sessionStorage.getItem("user")).id;
    const name = nameRef.current.value;
    const um = umRef.current.value;

    await api
      .post(
        "/products",
        {
          headers: {
            Authorization: `Bearer ${jwtRef.current}`,
            "Content-Type": "application/json",
          },
        },
        JSON.stringify({
          user,
          name,
          um,
        })
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
      <h2 style={{ margin: "20px 0 " }}>Cadastrar novo produto</h2>
      <Row form>
        <Col md={7}>
          <FormGroup>
            <Label for="nomeProduto">Nome do Produto</Label>
            <Input
              type="text"
              name="text"
              id="nomeProdutoInput"
              placeholder="Digite o nome do produto"
              innerRef={nameRef}
            />
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <Label for="umLabel">Unidade de Medida</Label>
            <Input
              type="select"
              name="select"
              id="umInputSelect"
              innerRef={umRef}
            >
              <option>baldes</option>
              <option>bisnagas</option>
              <option>caixas</option>
              <option>duzias</option>
              <option>gramas</option>
              <option>kilos</option>
              <option>litros</option>
              <option>pacotes</option>
              <option>pares</option>
              <option>rolos</option>
              <option>sacos</option>
              <option>unidades</option>
              <option>vidros</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Button onClick={() => createProduct()} color="primary" size="lg" block>
        Cadastrar Produto
      </Button>

      {error && (
        <Alert color="danger" style={{ marginTop: 20 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert color="success" style={{ marginTop: 20 }}>
          {success}
        </Alert>
      )}
    </>
  );
}
