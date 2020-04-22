import React from "react";

import { InputGroup, InputGroupAddon, Input, Button } from "../../template";
import { connect } from "react-redux";
import { updateSearchQuery, getPopularBooks } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const _SearchResultsHeader = (props) => (
  <React.Fragment>
    <div className="mb-4">
      <InputGroup>
        <Input
          placeholder="Search for..."
          className="bg-white"
          onChange={props.updateSearchQuery}
        />
        <InputGroupAddon addonType="append">
          <Button color="primary" onClick={props.getPopularBooks}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </React.Fragment>
);
export const SearchResultsHeader = connect(null, {
  updateSearchQuery,
  getPopularBooks
})(_SearchResultsHeader);
