import React, { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";

import {
  Container,
  Nav,
  NavItem,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Dropdown,
} from "reactstrap";

export default function Layout(props) {
  const title = "Almox Control";
  const [auth, setAuth] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const jwt = window.sessionStorage.getItem("jwt");
    if (!jwt) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  const logout = () => {
    window.sessionStorage.removeItem("jwt");
    window.sessionStorage.removeItem("user");
    Router.push("/");
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">Início</a>
            </Link>
          </NavItem>

          <NavItem className="ml-auto" style={{ color: "#fff" }}>
            Sistema de Gestão de Almoxarifado{" "}
          </NavItem>

          {auth && (
            <>
              <NavItem className="ml-auto">
                <Link href="/inventory">
                  <a className="nav-link">Estoque</a>
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={dropdownOpen}
                toggle={toggle}
                className="ml-right"
              >
                <DropdownToggle nav caret style={{ color: "#fff" }}>
                  Cadastrar
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/almox">Entrada</DropdownItem>
                  <DropdownItem href="/new">Saída</DropdownItem>
                  <DropdownItem href="/returning">Devolução</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/products">Novo Produto</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/register">Usuário</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <NavItem className="ml-right">
                <Link href="/">
                  <a className="nav-link" onClick={() => logout()}>
                    Sair
                  </a>
                </Link>
              </NavItem>
            </>
          )}

          {!auth && (
            <NavItem className="ml-auto">
              <Link href="/login">
                <a className="nav-link">Login</a>
              </Link>
            </NavItem>
          )}
        </Nav>
      </header>
      <Container
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
          paddingTop: "10px",
          marginTop: "20px",
          paddingBottom: "20px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {props.children}
      </Container>
    </>
  );
}
