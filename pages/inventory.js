import React, { useEffect, useRef } from "react";

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
      <iframe
        width="100%"
        height="800"
        src="https://app.powerbi.com/view?r=eyJrIjoiNTE3ZDNkOWQtZjkyMy00NzMwLTgwNWYtZjhkNDIxNmZjMmExIiwidCI6IjFiMzEwYjVkLWNjNjgtNDM4ZS1iMTI2LTVkNjgxNGM5MTUyZiJ9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </>
  );
};

export default New;
