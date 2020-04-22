import React from "react";
import { Row, Col } from "reactstrap";
import "../../style/Hover.css";
import { toggleBookModal, updateAndShowBookModal } from "../../redux/actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const _FavoriteCarouselRow = (props) => {
  const num_books = props.data.length;
  return (
    <React.Fragment>
      <Col fg="4">
        {num_books > 0 ? (
          <div
            class="img__wrap"
            onClick={() =>
              props.dispatch(updateAndShowBookModal(props.data[0]))
            }
          >
            <img
              src={props.data[0].IMAGE_URL}
              alt={props.data[0].TITLE}
              style={{
                height: "95%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block"
              }}
              class="img__img"
            />
            <div class="img_star">
              <FontAwesomeIcon icon={faStar} style={{ color: "#FEFF00" }} />
            </div>

            <p class="img__description">{props.data[0].TITLE}</p>
          </div>
        ) : null}
      </Col>
      <Col fg="4">
        {num_books > 1 ? (
          <div
            class="img__wrap"
            onClick={() =>
              props.dispatch(updateAndShowBookModal(props.data[1]))
            }
          >
            <img
              src={props.data[1].IMAGE_URL}
              alt={props.data[1].TITLE}
              style={{
                height: "95%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block"
              }}
              class="img__img"
            />
            <div class="img_star">
              <FontAwesomeIcon icon={faStar} style={{ color: "#FEFF00" }} />
            </div>

            <p class="img__description">{props.data[1].TITLE}</p>
          </div>
        ) : null}
      </Col>
      <Col fg="4">
        {num_books > 2 ? (
          <div
            class="img__wrap"
            onClick={() =>
              props.dispatch(updateAndShowBookModal(props.data[2]))
            }
          >
            <img
              src={props.data[2].IMAGE_URL}
              alt={props.data[2].TITLE}
              style={{
                height: "95%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block"
              }}
              class="img__img"
            />
            <div class="img_star">
              <FontAwesomeIcon icon={faStar} style={{ color: "#FEFF00" }} />
            </div>

            <p class="img__description">{props.data[2].TITLE}</p>
          </div>
        ) : null}
      </Col>
    </React.Fragment>
  );
};

export const FavoriteCarouselRow = connect(null, null)(_FavoriteCarouselRow);
