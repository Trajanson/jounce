"require strict";

import React              from 'react';

const NotificationBar = React.createClass({

  advertisementBanner() {
    if (window.currentUser.isPremium) {
      return (
        <div id="breaking-news-container">
          <div id="breaking-news-colour" className="slideup animated">

          </div>
           <span className="breaking-news-title delay-animated slidein extra-wide-title-premium">
              <b><a onClick={this.handledDisabledLink}>// Jounce <b id="premium-notification-text">Premium</b> //</a></b>
            </span>
            <a className="breaking-news-headline delay-animated2 fadein marquee">
            </a>
        </div>
      );
    } else {
      return (
        <div id="breaking-news-container">
          <div id="breaking-news-colour" className="slideup animated">

          </div>
           <span className="breaking-news-title delay-animated slidein">
              <b><a href={window.applicationRoutes.securePayRoute}>// Go Premium //</a></b>
            </span>
            <a href={window.applicationRoutes.securePayRoute} className="breaking-news-headline delay-animated2 fadein marquee">
              Love Jounce? &nbsp; &nbsp; Go Premium For Uninterrupted, Commercial Free Streaming Music Radio.
            </a>
        </div>

      );
    }
  },

  handledDisabledLink(event) {
    event.preventDefault();
  },


  render () {
    return (
      <div id="notification-bar" >
        { this.advertisementBanner() }
      </div>
    );
  },

});

module.exports = NotificationBar;
