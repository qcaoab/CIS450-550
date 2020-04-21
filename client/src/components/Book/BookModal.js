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
import { toggleBookModal, toggleFavorite } from "../../redux/actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const _BookModal = (props) => {
  const author_str = props.data.book_modal_info.authors
    .map((obj) => obj.author_id)
    .join(", ")
    .replace(/, ([^,]*)$/, " and $1");
  const book_modal_favorite = props.data.favorites.hasOwnProperty(
    props.data.book_modal_info.book_id
  );
  return (
    <div>
      <Modal
        isOpen={props.data.book_modal_visible}
        toggle={props.toggleBookModal}
        size="lg"
        style={{ maxWidth: "1600px", width: "80%", margin: "10px auto" }}
      >
        <ModalHeader toggle={props.toggleBookModal}>
          {props.data.book_modal_info.title}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={4}>
              <img
                src={props.data.book_modal_info.image_url}
                alt="book image"
                style={{ width: "100%" }}
              />
            </Col>
            <Col lg={8}>
              <span class="h5">{author_str}</span>
              <span className="mx-2">·</span>
              <span class="h5">
                {props.data.book_modal_info.num_pages} pages
              </span>
              <span className="mx-2">·</span>
              <span class="h5">
                Rating {props.data.book_modal_info.average_rating}/5
              </span>
              <span className="mx-2">·</span>
              <Button
                color={book_modal_favorite ? "warning" : "secondary"}
                onClick={props.toggleFavorite}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  style={
                    book_modal_favorite
                      ? { color: "#FEFF00" }
                      : { color: "#fff" }
                  }
                />
              </Button>

              <br />
              <br />
              <span>{props.data.book_modal_info.description}</span>
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
            Go to Author Page
          </Button>{" "}
          <Button color="secondary" onClick={props.toggleBookModal}>
            Find Online
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { data } = state;
  return { data };
};

export const BookModal = connect(mapStateToProps, {
  toggleBookModal,
  toggleFavorite
})(_BookModal);
