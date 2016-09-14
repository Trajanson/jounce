"require strict";

import React              from 'react';

const hashHistory = require('react-router').hashHistory;
import SearchActions from './../Actions/Search_Actions.jsx';


const HeaderBar = React.createClass({
  getInitialState() {
    return ({
      searchBoxEntry: "",
    });
  },


  navigateToPreviousClick(event) {
    event.preventDefault();
    hashHistory.goBack();
  },

  navigateToNextClick(event) {
    event.preventDefault();
    hashHistory.goForward();
  },


  logOut(event) {
    console.log(window.applicationRoutes.signoutRoute);
    event.preventDefault();
    console.log("test");
    $.ajax({
      type: "DELETE",
      url: window.applicationRoutes.signoutRoute,
      success () {
        console.log("test");
        window.location = window.applicationRoutes.landingPageRoute;
      }
    });
  },

  handleSearchBoxMouseEnter (event) {
    document.getElementById("search-box").focus();
  },

  handleSearchSubmit (event) {
    event.preventDefault();
    SearchActions.submitSearchRequest();
  },



  render () {
    let profile_image_url = window.currentUser.profile_image_url;
    return (
      <div id="header-bar">
        <a onClick={this.navigateToPreviousClick} href="#" className="navigation-chevron navigation-chevron-left clickable"></a>
        <a onClick={this.navigateToNextClick} href="#" className="navigation-chevron navigation-chevron-right clickable"></a>

        <div id="search-box-outer-container">
            <div id="search-box-form-container" onMouseEnter={this.handleSearchBoxMouseEnter}>
            <form action="#" className="entypo-search" onSubmit={this.handleSearchSubmit}>
              <fieldset><input id="search-box" placeholder="Search" /></fieldset>
            </form>
          </div>
        </div>

        <ul id="header-bar-elements">
          <li id="current-user-name"><span>{window.currentUser.username}</span></li>
          <li id="profile-image-container">
            <img className="avatar-image" src={profile_image_url}></img>
          </li>
          <li onClick={this.logOut} className="clickable"><span>Log Out</span></li>
      </ul>
      </div>
    );
  }
});

module.exports = HeaderBar;
