import React from 'react';

const NavBar = (props) => {
const { user, changeForm, logout, getProducts, changeActivePage } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand"><a href="http://localhost:3001">Home</a></div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">

            <li
                className="nav-item active"
                onClick={() => changeActivePage("Home")}>
                <div className="nav-link"> Home </div>
              </li>
          {// if the user is not authenticated
          !user && (
            <React.Fragment>
              <li
                className="nav-item active"
                onClick={() => changeForm("Login")}
              >
                <div className="nav-link"> Login </div>
              </li>
              <li
                className="nav-item active"
                onClick={() => changeForm("Signup")}
              >
                <div className="nav-link"> Signup</div>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li className="nav-item active" onClick={() => logout()}>
                <div className="nav-link">Logout</div>
              </li>
              <li className="nav-item active" onClick={() => { getProducts() ;  changeActivePage("products") } }>
                <div className="nav-link">products</div>
              </li>

            </React.Fragment>
          )
          // if the user authenticated
          }
        </ul>
      </div>
    </nav>
  );
};


export default NavBar;