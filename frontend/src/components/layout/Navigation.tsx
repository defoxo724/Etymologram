import React from "react";
import { Link } from "react-router-dom";
import NavigationContainer from "../utils/NavigationContainer";

const Navigation = () => {
  return (
    <NavigationContainer title={"Etymologram"}>
      <Link to={"/word-crud"} className="nav-item nav-link">
        Word CRUD
      </Link>
      <Link to={"/language-crud"} className="nav-item nav-link">
        Language CRUD
      </Link>
      <Link to={""} className="nav-item nav-link">
        Word relations viewer
      </Link>
    </NavigationContainer>
  );
};

export default Navigation;
