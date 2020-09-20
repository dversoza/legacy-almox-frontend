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

    try {
      const { jwt, user } = await api
        .post(
          "/register",
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
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Usuário ou senha incorretos, tente novamente.");
          }
          return res.json();
        });

      window.sessionStorage.setItem("jwt", jwt);
      window.sessionStorage.setItem("user", JSON.stringify(user));
      Router.push("/");
    } catch (e) {
      setError(e.toString());
    }
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
        <Alert color="danger" style={{ marginTop: 20 }}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default Register;
