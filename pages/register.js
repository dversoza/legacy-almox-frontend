import React, { useRef, useState } from "react";
import Router from "next/router";
import api from "../services/api";

import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

const Register = () => {
  const idRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();
  const [error, setError] = useState("");

  const register = async () => {
    const username = idRef.current.value;
    const email = emailRef.current.value;
    const password = pwdRef.current.value;

    await api
      .post(
        "auth/local/register",
        JSON.stringify({
          username,
          email,
          password,
        }),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (res) {
        if (res.status == 200) {
          window.sessionStorage.setItem("jwt", res.data.jwt);
          window.sessionStorage.setItem("user", JSON.stringify(res.data.user));
          Router.push("/");
        }
      })
      .catch(function (err) {
        if (err.response.status == 400) {
          setError("Usuário ou senha incorretos, tente novamente.");
          // console.log(err.response.status);
          // console.log(err.response.headers);
        } else if (err.request) {
          // console.log(err.request);
        } else {
          //console.log("Erro: ", err.message);
        }
      });

    window.sessionStorage.setItem("jwt", data.jwt);
    window.sessionStorage.setItem("user", JSON.stringify(data.user));
    Router.push("/");
  };

  return (
    <>
      <h1>Cadastrar novo usuário</h1>
      <Form>
        <FormGroup>
          <Label>Usuário:</Label>
          <Input type="text" placeholder="Usuário" innerRef={idRef}></Input>
        </FormGroup>
        <FormGroup>
          <Label>E-mail:</Label>
          <Input
            type="text"
            placeholder="nome@domínio.com.br"
            innerRef={emailRef}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Senha:</Label>
          <Input type="password" placeholder="Senha" innerRef={pwdRef}></Input>
        </FormGroup>
        <Button color="primary" size="lg" block onClick={() => register()}>
          Cadastrar
        </Button>
      </Form>
      {error && (
        <Alert color="danger" style={{ marginTop: 20, marginBottom: -5 }}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default Register;
