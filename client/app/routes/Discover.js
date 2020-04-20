import React from "react";

import { Container, Row, CardColumns, Col } from "../components";
import { Card, UncontrolledTooltip, Button, CardBody } from "../components";
const UsersResultsCard = () => (
  <React.Fragment>
    {/* START Card */}
    <Card className="mb-3">
      <CardBody>
        <div className="d-flex">
          <Button color="link" size="sm" id="tooltipGridAddToFavorites">
            <i className="fa fa-star-o"></i>
          </Button>
          <UncontrolledTooltip
            placement="top"
            target="tooltipGridAddToFavorites"
          >
            Add To Favorites
          </UncontrolledTooltip>
        </div>
        <div className="text-center mb-4">
          <div className="mb-2">
            <span className="small">Labels</span>
          </div>
        </div>
        <div className="text-center mb-4">
          <div className="mb-2">
            <span className="small">Profile</span>
          </div>
        </div>
      </CardBody>
    </Card>
    {/* END Card */}
  </React.Fragment>
);

const UsersResults = () => (
  <React.Fragment>
    <Container>
      <Row>
        <Col lg={3}></Col>
        <Col lg={9}>
          <CardColumns>
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
          </CardColumns>
        </Col>
      </Row>
      {/* END Content */}
    </Container>
  </React.Fragment>
);

export default UsersResults;
