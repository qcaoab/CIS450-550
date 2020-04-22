import React from "react";

import { Card, CardBody, Row, Col } from "../../template";
import { connect } from "react-redux";
import { updateAndShowBookModal } from "../../redux/actions";

const _SearchResultsCard = (props) => (
  <React.Fragment>
    <Card className="mb-3">
      <CardBody
        onClick={() => props.dispatch(updateAndShowBookModal(props.book_info))}
      >
        <Row>
          <Col lg={2}>
            <img
              src={props.book_info.IMAGE_URL ? props.book_info.IMAGE_URL : ""}
              alt=""
              style={{ height: "100%" }}
            />
          </Col>
          <Col lg={10}>
            <a className="h5 text-decoration-none">
              {props.book_info.TITLE ? props.book_info.TITLE : "Book Title"}
            </a>
            <br />
            <div className="mb-2">
              {props.book_info.AUTHOR ? props.book_info.AUTHOR : "Book Author"}
              <span className="mx-2">·</span>
              <span>{props.book_info.PUBLICATION_YEAR}</span>
              <span className="mx-2">·</span>
              Rating: {props.book_info.AVERAGE_RATING}/5
              {/* <span className="mx-2">·</span> */}
            </div>
            <p className="mb-0">
              {props.book_info.DESCRIPTION
                ? props.book_info.DESCRIPTION
                : "testing"}
            </p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </React.Fragment>
);
export const SearchResultsCard = connect(null, null)(_SearchResultsCard);
