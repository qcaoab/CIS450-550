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
      <div>
        <div style={{ paddingLeft: 20, paddingTop: 20 }}>
          <div className="h2" style={{ paddingLeft: 10 }}>
            Favorites
          </div>
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
      </div>
    );
  }
}

export const Favorites = connect(null, null)(_Favorites);
