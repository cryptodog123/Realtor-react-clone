import React from "react";

const ListItem = ({ listing }) => {
  return <div>{listing.data.name}</div>;
};

export default ListItem;
