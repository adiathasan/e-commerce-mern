import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <>
      <Spinner className="spin" animation="border" role="status">
        <span className="sr-only">Loadind...</span>
      </Spinner>
    </>
  );
};

export default Loader;
