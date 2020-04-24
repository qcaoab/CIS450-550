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
  // const author_str = props.data.book_modal_info.AUTHORS
  //   .map((obj) => obj.author_id)
  //   .join(", ")
  //   .replace(/, ([^,]*)$/, " and $1");
  const author_str = "Author Name";
  const book_modal_favorite = props.data.favorites.hasOwnProperty(
    props.data.book_modal_info.BOOK_ID
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
          {props.data.book_modal_info.TITLE}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={4}>
              <img
                src={props.data.book_modal_info.IMAGE_URL}
                alt="book image"
                style={{ width: "100%" }}
              />
            </Col>
            <Col lg={8}>
              <span class="h5">{author_str}</span>
              <span className="mx-2">·</span>
              <span class="h5">
                {props.data.book_modal_info.NUM_PAGES} pages
              </span>
              <span className="mx-2">·</span>
              <span class="h5">
                Rating {props.data.book_modal_info.AVERAGE_RATING}/5
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
              <div style={{ textAlign: "center" }}>
                <span>{props.data.book_modal_info.DESCRIPTION}</span>
              </div>
              <br />
              <br />
              <div style={{ paddingTop: 20 }}>
                <span class="h5">Author Profile</span>
                <br />
                <div style={{ textAlign: "left", paddingTop: 5 }}>{"TODO"}</div>
              </div>
              <div style={{ paddingTop: 20 }}>
                <span class="h5">Reviews</span>
                <div style={{ textAlign: "center", paddingTop: 5 }}>
                  <p>
                    {
                      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eligendi deserunt exercitationem, voluptate, odit sunt necessitatibus iusto neque unde debitis dolor sit doloribus rerum perspiciatis ea labore quasi esse. Itaque."
                    }
                  </p>
                </div>
                <br />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggleBookModal}>
            Go to Author Page
          </Button>
          <Button
            color="secondary"
            href={`https://franklin.library.upenn.edu/bento?utf8=%E2%9C%93&q=${props.data.book_modal_info.TITLE}`}
            target="_blank"
          >
            Find In Library
          </Button>
          <Button
            color="secondary"
            href={`https://franklin.library.upenn.edu/bento?utf8=%E2%9C%93&q=${props.data.book_modal_info.TITLE}`}
            target="_blank"
          >
            Find On Google
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
