import React, { useRef, useState } from "react";
import Router from "next/router";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/auth/local";

const Login = () => {
  const idRef = useRef();
  const pwdRef = useRef();
  const [error, setError] = useState("");

  const login = async () => {
    const identifier = idRef.current.value;
    const password = pwdRef.current.value;

    try {
      const { jwt, user } = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      }).then((res) => {
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
      {error && <div style={{ border: "1px red solid" }}>{error}</div>}
    </>
  );
};

export default Login;
