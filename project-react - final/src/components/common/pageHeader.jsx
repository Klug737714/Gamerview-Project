import React from "react";

const PageHeader = ({ title, description }) => {
  return (
    <div className="row">
      <div className="col-12 text-center mt-3">
        <h1 className="display-4">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default PageHeader;
