import React, { useEffect, useRef } from "react";
import Router from "next/router";

import GiveBackForm from "../components/giveBackForm";

const Returning = () => {
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
      <GiveBackForm />
    </>
  );
};

export default Returning;
