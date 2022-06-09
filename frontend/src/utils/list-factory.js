import React from "react";
import ListWrapper from "../components/lists/list-wrapper";

const makeList = (mediaType = "") => (
  <ListWrapper mediaType={mediaType} className={`${mediaType}-list`} />
);

export { makeList };
