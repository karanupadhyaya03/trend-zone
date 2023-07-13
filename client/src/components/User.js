import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  // to get url from the browser
  const { id } = useParams();
  return <div>USER PAGE with id: {id}</div>;
};

export default User;
