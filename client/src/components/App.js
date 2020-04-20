import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Search from "./Search/Search";
import BestGenres from "./BestGenres";
import Posters from "./Posters";
import { BookModal } from "./Book/BookModal";
import { Discover } from "./Book/Discover";
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BookModal />
        <Router>
          <Switch>
            <Route exact path="/discover" render={() => <Discover />} />
            <Route exact path="/dashboard" render={() => <Dashboard />} />
            <Route path="/search" render={() => <Search />} />
            <Route path="/bestgenres" render={() => <BestGenres />} />
            <Route path="/posters" render={() => <Posters />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
