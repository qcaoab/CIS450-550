import React from "react";
import {
  Container,
  Row,
  Col,
  CardColumns,
  InputGroup,
  Input,
  Button,
  InputGroupAddon,
  Nav,
  CustomInput,
  Badge,
} from "../components";
import faker from "faker/locale/en_US";
import { connect } from "react-redux";
import { HeaderMain } from "./components/HeaderMain";
import { SearchResultsLeftNav } from "./components/SearchResults/SearchResultsLeftNav";
import { SearchResultsHeader } from "./components/SearchResults/SearchResultsHeader";
import { SearchResultsCard } from "./components/SearchResults/SearchResultsCard";
import { UsersResultsCard } from "./components/SearchResults/UsersResultsCard";

class Search extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <HeaderMain title="Search Results" className="mb-5 mt-4" />

          {/* START Content */}
          <Row>
            <Col lg={3}>
              <SearchResultsLeftNav />
            </Col>

            <Col lg={9}>
              <SearchResultsHeader />
              {this.props.search.results &&
                this.props.search.results.map((obj) => (
                  <SearchResultsCard {...obj} />
                ))}

              {/* <CardColumns>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                    </CardColumns> */}
              <div className="d-flex justify-content-center">
                {/* <Paginations /> */}
              </div>
            </Col>
          </Row>
          {/* END Content */}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state;
  return { search };
};
export default connect(mapStateToProps)(Search);
