import React from "react";
import faker from "faker/locale/en_US";

import { Card, CardBody, Row, Col } from "./../../../components";

const SearchResultsCard = (props) => (
  <React.Fragment>
    <Card className="mb-3">
      <CardBody>
        <Row>
          <Col lg={2}>
            <img
              src={props.image_url ? props.image_url : ""}
              alt=""
              style={{ height: "100%" }}
            />
          </Col>
          <Col lg={10}>
            <a href="#" className="h5 text-decoration-none">
              {props.title ? props.title : "Book Title"}
            </a>
            <br />
            <div className="mb-2">
              {props.author ? props.author : "Book Author"}
              <span className="mx-2">·</span>
              Rating: {props.average_rating}/5
              <span className="mx-2">·</span>
              <span>Votes</span>
            </div>
            <p className="mb-0">
              {props.description ? props.description : faker.lorem.paragraph()}
            </p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </React.Fragment>
);

export { SearchResultsCard };
