import React from "react";
import "../../style/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "../PageNavbar";
import { connect } from "react-redux";
import { BookCarousel } from "./BookCarousel";
import Background from "./bg3.jpg";
import { discoverBooks } from "../../redux/actions";
class _Discover extends React.Component {
  componentWillMount() {
    this.props.discoverBooks();
  }
  render() {
    return (
      <div>
        <div style={{ paddingLeft: 20, paddingTop: 20 }}>
          <div className="h2" style={{ paddingLeft: 10 }}>
            Discover
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
            <BookCarousel />
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export const Discover = connect(null, { discoverBooks })(_Discover);
