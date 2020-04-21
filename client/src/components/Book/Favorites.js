import React from "react";
import "../../style/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "../PageNavbar";
import { connect } from "react-redux";
import { FavoriteCarousel } from "./FavoriteCarousel";
import Background from "./bg3.jpg";

class _Favorites extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="favorites" />

        <br></br>
        <br></br>

        <div
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "100%",
            height: 600,
            width: 1100
          }}
          className="container books-container"
        >
          <FavoriteCarousel />
          <br></br>
        </div>
      </div>
    );
  }
}

export const Favorites = connect(null, null)(_Favorites);
