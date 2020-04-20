import React from "react";
import { Row, Col } from "reactstrap";
import "../../style/Hover.css";
export const BookCarouselRow = (props) => {
  return (
    <React.Fragment>
      <Col fg="4">
        <div class="img__wrap">
          <img
            src="https://images.gr-assets.com/books/1348176637m/16037549.jpg"
            alt="book image"
            style={{
              height: "95%",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
            class="img__img"
          />

          <p class="img__description">title</p>
        </div>
      </Col>
      <Col fg="4">
        <div class="img__wrap">
          <img
            src="https://images.gr-assets.com/books/1348176637m/16037549.jpg"
            alt="book image"
            style={{
              height: "95%",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
            class="img__img"
          />

          <p class="img__description">title</p>
        </div>
      </Col>
      <Col fg="4">
        <div class="img__wrap">
          <img
            src="https://images.gr-assets.com/books/1348176637m/16037549.jpg"
            alt="book image"
            style={{
              height: "95%",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
            class="img__img"
          />

          <p class="img__description">title</p>
        </div>
      </Col>
    </React.Fragment>
  );
};
