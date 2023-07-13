import React from "react";
import { useParams } from "react-router-dom";

const Club = () => {
  // to get url from the browser
  const { id } = useParams();
  return <div>CLUB PAGE with id: {id}</div>;
};

export default Club;
