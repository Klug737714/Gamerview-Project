import React from "react";

const Footer = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <p className="text-center text-muted">
            The Gamer View &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
