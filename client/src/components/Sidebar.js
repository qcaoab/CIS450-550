import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faUserEdit,
  faStar,
  faSearch,
  faBook
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SideBar = (props) => (
  <div className={classNames("sidebar", { "is-open": props.isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={props.toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Bookworm</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <NavItem>
          <NavLink exact tag={Link} to={"/discover"}>
            <FontAwesomeIcon icon={faBook} className="mr-2" />
            Discover
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/favorites"}>
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            Favorites
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/authors"}>
            <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
            Authors
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/search"}>
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            Search
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/trivia"}>
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            Trivia
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);
export default SideBar;
