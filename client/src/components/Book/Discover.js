import React from "react";
import "../../style/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "../PageNavbar";
import { connect } from "react-redux";
import { BookCarousel } from "./BookCarousel";
import Background from "./bg3.jpg";

class _Discover extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="discover" />

        <div
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "100%",
            height: 600,
            width: 1100,
            marginTop: 70
          }}
          className="container books-container"
        >
          <BookCarousel />
          <br></br>
        </div>
      </div>
    );
  }
}

export const Discover = connect(null, null)(_Discover);
