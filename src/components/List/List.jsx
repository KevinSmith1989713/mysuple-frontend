import React, { useState } from "react";
import classNames from "classnames";
import "./List.scss";
import Title from "../Title/Title";

const List = ({ 
  title,
  icon,
  className,
  children,
  ...rest 
}) => {

  return (
    <div className={classNames("List--component", className, title)}>
      <header>
        {!!icon && <img src={icon} alt="icon"/>}
        <Title size='large'>{title}</Title>
      </header>
      {children}
    </div>
  );
};

List.defaultProps = {
  title:"set your title!",
  icon:null
};

export default List;