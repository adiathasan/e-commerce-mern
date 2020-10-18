import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col className="text-center text-white py-3 bg-info">Copyright &copy; Khulna-Shop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
