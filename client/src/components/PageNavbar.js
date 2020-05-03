import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
export default class PageNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navDivs: []
    };
  }

  componentDidMount() {
    const pageList = ["discover", "favorites", "authors", "search", "trivia"];

    let navbarDivs = pageList.map((page, i) => {
      if (this.props.active === page) {
        return (
          <a className="nav-item nav-link active" key={i} href={"/" + page}>
            {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
          </a>
        );
      } else {
        return (
          <a className="nav-item nav-link" key={i} href={"/" + page}>
            {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
          </a>
        );
      }
    });

    this.setState({
      navDivs: navbarDivs
    });
  }
  render() {
    return (
      <div className="PageNavbar">
        <div>
          <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">
              reactstrap
            </NavbarBrand>
            <NavbarToggler onClick={null} className="mr-2" />
            <Collapse isOpen={1} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">
                    GitHub
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <nav
          className="navbar fixed-left navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#F9F9EB" }}
        >
          <span className="navbar-brand center">Bookworm</span>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">{this.state.navDivs}</div>
          </div>
        </nav>
      </div>
    );
  }
}
