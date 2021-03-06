import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class SearchRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bookResults">
        <div className="title">{this.props.title}</div>
        <div className="id">{this.props.id}</div>
        <div className="rating">{this.props.rating}</div>
        <div className="votes">{this.props.votes}</div>
      </div>
    );
  }
}
