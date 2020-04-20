import React from "react";
import PageNavbar from "./PageNavbar";
import SearchRow from "./SearchRow";
import "../style/Search.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PosterEntry from "./PosterEntry";

export default class Posters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieData: []
    };
  }

  handleMovieNameChange(e) {
    this.setState({
      movieName: e.target.value
    });
  }

  componentDidMount() {
    fetch(`http://localhost:8081/randomMovies`, {
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
      .then((movieList) => {
        if (!movieList) return;
        let movieDivs = movieList.map((movieObj, i) => {
          fetch(
            `http://www.omdbapi.com/?i=${movieObj.imdb_id}&apikey=e18f3f1b`,
            {
              method: "GET"
            }
          )
            .then(
              (res) => {
                return res.json();
              },
              (err) => {
                console.log(err);
              }
            )
            .then((movieJson) => {
              console.log(movieJson);
              return this.setState({
                movieData: this.state.movieData.concat(
                  <PosterEntry {...movieJson} />
                )
              });
            });
        });
      });
  }

  render() {
    return (
      <div className="Search">
        <PageNavbar active="search" />

        <div
          className="container search-container"
          style={{ marginLeft: 250, marginRight: "auto" }}
        >
          <div className="jumbotron" style={{ width: 1500 }}>
            <div className="h3">Search</div>
            <br></br>
            <div class="d-flex flex-wrap justify-content-around" id="results">
              {this.state.movieData}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
