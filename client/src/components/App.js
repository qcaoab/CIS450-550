import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Search from "./Search";
import BestGenres from "./BestGenres";
import Posters from "./Posters";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Dashboard />} />
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
