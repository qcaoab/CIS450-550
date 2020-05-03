import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import { Discover } from "./Book/Discover";
import Trivia from "./Trivia/Trivia";
import { Favorites } from "./Book/Favorites";
import Search from "./Search/Search";
import Author from "./Authors/Authors";

export default (props) => (
  <Container
    fluid
    className={classNames("content", { "is-open": props.isOpen })}
  >
    <Switch>
      <Route exact path="/" render={() => <Discover />} />
      <Route exact path="/discover" render={() => <Discover />} />
      <Route exact path="/favorites" render={() => <Favorites />} />
      <Route path="/search" render={() => <Search />} />
      <Route path="/authors" render={() => <Author />} />
      <Route path="/trivia" render={() => <Trivia />} />
    </Switch>
  </Container>
);
