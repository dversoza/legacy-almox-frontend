import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
            crossOrigin="anonymous"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <footer
          style={{
            display: "flex",
            flexGrow: 1,
            alignSelf: "flex-end",
            alignItems: "center",
            flexDirection: "column",
            fontSize: "10px",
            color: "#477890",
          }}
        >
          Desenvolvido por Daniel Versoza Alves
        </footer>
      </>
    );
  }
}
export default MyApp;
