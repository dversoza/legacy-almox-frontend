import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import RecentOperations from "../components/recentOperations";

function Home() {
  const jwtRef = useRef();
  const [user, setUser] = useState();

  useEffect(() => {});

  useEffect(() => {
    const jwt = window.sessionStorage.getItem("jwt");
    if (!jwt) {
      Router.push("/login");
    } else {
      setUser(JSON.parse(window.sessionStorage.getItem("user")).username);
      jwtRef.current = jwt;
    }
  }, []);

  return (
    <>
      <h1 style={{ margin: "20px" }}>Bem-vinda, {user}!</h1>
      <RecentOperations />
    </>
  );
}

export default Home;
