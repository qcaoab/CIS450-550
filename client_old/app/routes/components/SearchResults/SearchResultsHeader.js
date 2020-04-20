import React from "react";

import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "./../../../components";
import { connect } from "react-redux";
import { updateSearchQuery } from "../../../redux/actions";

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
          <Button color="primary">
            <i className="fa fa-search"></i>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </React.Fragment>
);
export const SearchResultsHeader = connect(null, { updateSearchQuery })(
  _SearchResultsHeader
);
