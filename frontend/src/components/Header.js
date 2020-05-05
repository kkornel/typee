import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="ui inverted menu">
        <div className="header item">Brand</div>
        <div className="active item">Link</div>
        <a className="item">Link</a>
        <div className="ui dropdown item">
          Dropdown
          <i className="dropdown icon"></i>
          <div className="menu transition hidden">
            <div className="item">Action</div>
            <div className="item">Another Action</div>
            <div className="item">Something else here</div>
            <div className="divider"></div>
            <div className="item">Separated Link</div>
            <div className="divider"></div>
            <div className="item">One more separated link</div>
          </div>
        </div>
        <div className="right menu">
          <div className="item">
            <div className="ui transparent inverted icon input">
              <i className="search icon"></i>
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <a className="item">Link</a>
          <div className="item">
            <div className="ui primary button">Sign up</div>
          </div>
          <div className="item">
            <div className="ui button">Log-in</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
