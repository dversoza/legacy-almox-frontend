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
        src="https://app.powerbi.com/reportEmbed?reportId=946001bf-78ae-48d9-b06c-8a57854c886b&autoAuth=true&ctid=1b310b5d-cc68-438e-b126-5d6814c9152f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1iLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </>
  );
};

export default New;
