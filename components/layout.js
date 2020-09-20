import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Container, Nav, NavItem } from "reactstrap";

export default function Layout(props) {
  const title = "Almox Control";

  return (
    <div>
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

          <NavItem className="ml-auto">
            <Link href="/new">
              <a className="nav-link">Nova Movimentação</a>
            </Link>
          </NavItem>

          <NavItem>
            <Link href="/login">
              <a className="nav-link">Login</a>
            </Link>
          </NavItem>

          <NavItem>
            <Link href="/register">
              <a className="nav-link">Cadastro</a>
            </Link>
          </NavItem>
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
    </div>
  );
}
