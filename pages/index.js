import React, { useEffect, useRef } from "react";
import Router from "next/router";
import RecentOperations from "../components/recentOperations";

function Home() {
  const jwtRef = useRef();

  useEffect(() => {
    const jwt = window.sessionStorage.getItem("jwt");
    if (!jwt) {
      Router.push("/login");
    }
    jwtRef.current = jwt;
  }, []);

  return (
    <>
      <h1 style={{ margin: "20px" }}>Bem-vindo(a) ao Almox-Control</h1>
      <RecentOperations />
    </>
  );
}

export default Home;
