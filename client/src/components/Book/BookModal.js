import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { toggleBookModal } from "../../redux/actions";
import { connect } from "react-redux";

const _BookModal = (props) => {
  const author_str = props.book.info.authors
    .map((obj) => obj.author_id)
    .join(", ")
    .replace(/, ([^,]*)$/, " and $1");
  return (
    <div>
      <Modal
        isOpen={props.book.visible}
        toggle={props.toggleBookModal}
        size="lg"
        style={{ maxWidth: "1600px", width: "80%", margin: "10px auto" }}
      >
        <ModalHeader toggle={props.toggleBookModal}>
          <h2>{props.book.info.title}</h2>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={4}>
              <img
                src={props.book.info.image_url}
                alt="book image"
                style={{ width: "100%" }}
              />
            </Col>
            <Col lg={8}>
              <span class="h5">{author_str}</span>
              <span className="mx-2">·</span>
              <span class="h5">{props.book.info.num_pages} pages</span>
              <span className="mx-2">·</span>
              <span class="h5">Rating {props.book.info.average_rating}/5</span>
              <br />
              <br />
              <span>{props.book.info.description}</span>
              <br />
              <br />
              <span class="h5">Quotes</span>
              <br />
              <br />
              <span class="h5">Reviews</span>
              <br />
              <br />
              <span class="h5">Author Profile</span>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggleBookModal}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={props.toggleBookModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { book } = state;
  return { book };
};
export const BookModal = connect(mapStateToProps, { toggleBookModal })(
  _BookModal
);
