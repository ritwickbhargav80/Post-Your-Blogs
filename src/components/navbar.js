import React from "react";

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <h2>Post Your Blogs</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#myid"
          aria-controls="myid"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="myid">
          <ul className="nav">
            <button className="btn btn-primary m-2">
              <a className="login" href="/">
                Login
              </a>
            </button>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
