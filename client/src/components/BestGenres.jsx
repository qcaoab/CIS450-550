import React from "react";
import PageNavbar from "./PageNavbar";
import BestGenreRow from "./BestGenreRow";
import "../style/BestGenres.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class BestGenre extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDecade: "",
      decades: [],
      genres: []
    };

    this.submitDecade = this.submitDecade.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /* ---- Q3a (Best Genres) ---- */
  componentDidMount() {
    fetch("http://localhost:8081/decades", {
      method: "GET"
    })
      .then(
        res => {
          return res.json();
        },
        err => {
          console.log(err);
        }
      )
      .then(decadeList => {
        this.setState({
          decades: decadeList.map((decadeObj, i) => {
            let decade = decadeObj.decade;
            return <option value={decade}>{decade}</option>;
          })
        });
      });
  }

  handleChange(e) {
    this.setState({
      selectedDecade: e.target.value
    });
  }

  /* ---- Q3b (Best Genres) ---- */
  submitDecade() {
    fetch(
      `http://localhost:8081/bestGenresPerDecade/${this.state.selectedDecade}`,
      {
        method: "GET"
      }
    )
      .then(
        res => {
          return res.json();
        },
        err => {
          console.log(err);
        }
      )
      .then(bestGenreList => {
        if (!bestGenreList) return;
        let genreDivs = bestGenreList.map((genreObj, i) => (
          <BestGenreRow genre={genreObj.genre} rating={genreObj.avg_rating} />
        ));
        this.setState({ genres: genreDivs });
      });
  }

  render() {
    return (
      <div className="BestGenres">
        <PageNavbar active="bestgenres" />

        <div className="container bestgenres-container">
          <div className="jumbotron">
            <div className="h5">Best Genres</div>

            <div className="years-container">
              <div className="dropdown-container">
                <select
                  value={this.state.selectedDecade}
                  onChange={this.handleChange}
                  className="dropdown"
                  id="decadesDropdown"
                >
                  {this.state.decades}
                </select>
                <button
                  className="submit-btn"
                  id="decadesSubmitBtn"
                  onClick={this.submitDecade}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movie">
                <div className="header">
                  <strong>Genre</strong>
                </div>
                <div className="header">
                  <strong>Average Rating</strong>
                </div>
              </div>
              <div className="movies-container" id="results">
                {this.state.genres}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

