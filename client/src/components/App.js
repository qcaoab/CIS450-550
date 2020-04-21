import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./Search/Search";
import Author from "./Authors/Authors";
import { BookModal } from "./Book/BookModal";
import { Discover } from "./Book/Discover";
import Trivia from "./Trivia/Trivia";
import { Favorites } from "./Book/Favorites";
export default class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <BookModal />
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Discover />} />
            <Route exact path="/discover" render={() => <Discover />} />
            <Route exact path="/favorites" render={() => <Favorites />} />
            <Route path="/search" render={() => <Search />} />
            <Route path="/authors" render={() => <Author />} />
            <Route path="/trivia" render={() => <Trivia />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
