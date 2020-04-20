import React from "react";
import "../style/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";
import GenreButton from "./GenreButton";
import DashboardbookRow from "./DashboardBookRow";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of books for a specified genre.
    this.state = {
      genres: [],
      books: []
    };

    this.showbooks = this.showbooks.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres", {
      method: "GET" // The type of HTTP request.
    })
      .then(
        (res) => {
          // Convert the response data to a JSON.
          return res.json();
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      )
      .then(
        (genreList) => {
          if (!genreList) return;
          // Map each genreObj in genreList to an HTML element:
          // A button which triggers the showbooks function for each genre.
          let genreDivs = genreList.map((genreObj, i) => (
            <GenreButton
              id={"button-" + genreObj.genre}
              onClick={() => this.showbooks(genreObj.genre)}
              genre={genreObj.genre}
            />
          ));

          // Set the state of the genres list to the value returned by the HTTP response from the server.
          this.setState({
            genres: genreDivs
          });
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      );
  }

  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.books to a list of <DashboardbookRow />'s. */
  showbooks(genre) {
    fetch(`http://localhost:8081/genres/${genre}`, {
      method: "GET"
    })
      .then(
        (res) => {
          return res.json();
        },
        (err) => {
          console.log(err);
        }
      )
      .then((topbookList) => {
        if (!topbookList) return;
        let bookDivs = topbookList.map((bookObj, i) => (
          <DashboardbookRow
            title={bookObj.title}
            rating={bookObj.rating}
            votes={bookObj.vote_count}
          />
        ));
        this.setState({
          books: bookDivs
        });
      });
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container books-container">
          <div className="jumbotron">
            <div className="h5">Top books</div>
            <div className="genres-container">{this.state.genres}</div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="books-container">
              <div className="books-header">
                <div className="header-lg">
                  <strong>Title</strong>
                </div>
                <div className="header">
                  <strong>Rating</strong>
                </div>
                <div className="header">
                  <strong>Vote Count</strong>
                </div>
              </div>
              <div className="results-container" id="results">
                {this.state.books}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
