import React from "react";
import classNames from "classnames";
import "./Advertisement.scss";

const Advertisement = ({ children, size, className, border, type }) => {
  return (
    <div className={classNames("Card", size, border, className)}>
      {children}
    </div>
  );
};

Advertisement.defaultProps = {
  size: "small",
  border: "none"
};

export default Advertisement;
