import React, { useEffect, useRef } from "react";
import Router from "next/router";

import AlmoxEntryForm from "../components/almoxEntryForm";

const New = () => {
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
      <AlmoxEntryForm />
    </>
  );
};

export default New;
