import React, { useRef, useState } from "react";
import Router from "next/router";
import api from "../services/api";

import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";

const Login = () => {
  const idRef = useRef();
  const pwdRef = useRef();

  const [error, setError] = useState("");

  const login = async () => {
    const identifier = idRef.current.value;
    const password = pwdRef.current.value;

    await api
      .post(
        "/auth/local",
        JSON.stringify({
          identifier,
          password,
        }),
        {
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
  };

  return (
    <>
      <Form>
        <FormGroup>
          <Label>Digite seu usuário ou e-mail:</Label>
          <Input
            type="email"
            placeholder="Usuário or e-mail"
            innerRef={idRef}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Digite sua senha:</Label>
          <Input type="password" placeholder="Senha" innerRef={pwdRef}></Input>
        </FormGroup>
        <Button color="primary" size="lg" block onClick={() => login()}>
          Entrar
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

export default Login;
