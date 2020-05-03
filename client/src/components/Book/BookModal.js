import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner
} from "reactstrap";
import { toggleBookModal, toggleFavorite } from "../../redux/actions";
import { connect } from "react-redux";
import "../../style/Description.css";
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
              <span class="h5">
                {props.data.book_modal_info.NUM_PAGES
                  ? props.data.book_modal_info.NUM_PAGES + " pages"
                  : ""}
              </span>
              {props.data.book_modal_info.NUM_PAGES && (
                <span className="mx-2">·</span>
              )}
              <span class="h5">
                Rating{" "}
                {Math.round(
                  (props.data.book_modal_info.AVERAGE_RATING + Number.EPSILON) *
                    100
                ) / 100}
                /5
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
              <div class="h5">Description</div>

              <div style={{ textAlign: "center" }}>
                <span>
                  {props.data.book_modal_info.DESCRIPTION
                    ? props.data.book_modal_info.DESCRIPTION
                    : "Description for this book is not avaiable."}
                </span>
              </div>
              <div style={{ paddingTop: 20 }}>
                <div class="h5">Author Profile</div>
                {props.data.author_loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  </div>
                ) : !props.data.invalid_author ? (
                  <div style={{ textAlign: "left" }}>
                    <span class="h6">
                      Name: {props.data.author_page_info.NAME}
                    </span>
                    <br />
                    {props.data.author_page_info.AUTHOR_DESC && (
                      <React.Fragment>
                        <div class="h6" style={{ paddingTop: 5 }}>
                          Biography:
                        </div>
                        <div
                          className="description"
                          style={{ textAlign: "center" }}
                        >
                          {props.data.author_page_info.AUTHOR_DESC}
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", paddingTop: 5 }}>
                    <span>Author Info Not Avaiable</span>
                  </div>
                )}
              </div>
              <div style={{ paddingTop: 20 }}>
                <span class="h5">Reviews</span>
                {props.data.review_loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  </div>
                ) : props.data.book_modal_review &&
                  props.data.book_modal_review.length ? (
                  <div style={{ textAlign: "left", paddingTop: 20 }}>
                    {props.data.book_modal_review.map((item) => (
                      <div>
                        <div>{item.REVIEW_TEXT}</div>
                        <div>
                          Rating: {item.RATING} Votes: {item.N_VOTES}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", paddingTop: 5 }}>
                    <span>No Reviews Found</span>
                  </div>
                )}
                <br />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={props.toggleBookModal}
            href={"/authors"}
            disabled={
              props.data.author_loading ||
              props.data.author_page_info.invalid_author
            }
          >
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
            href={`https://www.google.com/search?q=${props.data.book_modal_info.TITLE}`}
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

const mapDispatchToProps = (dispatch) => ({
  toggleBookModal: () => dispatch(toggleBookModal()),
  toggleFavorite: () => dispatch(toggleFavorite()),
  dispatch
});

export const BookModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BookModal);
