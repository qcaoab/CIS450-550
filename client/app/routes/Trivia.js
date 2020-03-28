import React from "react";
import { Container, Row, Col } from "../components";
import { HeaderMain } from "./components/HeaderMain";
import { AdvancedTableA } from "./Tables/ExtendedTable/components";

class Trivia extends React.Component {
  render() {
    return (
      <Container>
        <HeaderMain title="Extended Tables" className="mb-5 mt-4" />
        <Row className="mb-5">
          <Col>
            <AdvancedTableA />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Trivia;
