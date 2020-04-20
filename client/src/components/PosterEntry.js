import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class PosterEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        class="card"
        style={{ marginTop: 30, width: 400, justifyContent: "center" }}
      >
        <a
          style={{ justifyContent: "center", height: 500 }}
          href={
            this.props.Website != "N/A"
              ? this.props.Website
              : "http://ww.google.com"
          }
        >
          <img
            class="card-img-top"
            style={{ height: 500 }}
            src={this.props.Poster}
            alt="Card image cap"
          />
        </a>
        <div class="card-body">
          <h5 class="card-title" style={{ textAlign: "center" }}>
            {this.props.Title}
          </h5>
          <h6
            class="card-subtitle mb-2 text-muted"
            style={{ textAlign: "center" }}
          >
            {this.props.Year}
          </h6>
          <div class="plot">{this.props.Plot}</div>
        </div>
      </div>
    );
  }
}
