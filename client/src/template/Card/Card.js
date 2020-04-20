import React from "react";
import { Card as BsCard } from "reactstrap";

const Card = (props) => {
  const { children, type, color, className, ...otherProps } = props;

  return <BsCard {...otherProps}>{children}</BsCard>;
};
Card.defaultProps = {
  type: "border",
  color: null
};

export { Card };
