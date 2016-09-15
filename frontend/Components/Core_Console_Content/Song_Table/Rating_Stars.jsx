"require strict";

import React                from 'react';

import SingleStar           from './Single_Star.jsx';

import ViewedSongsStore     from './../../../Stores/Viewed_Songs_Store.jsx';
import ViewedSongsActions     from './../../../Actions/Viewed_Songs_Actions.jsx';

var RatingStars = React.createClass({

  handleStarClick(starSelected) {
    let newNumberOfStars;
    if (starSelected === this.props.starRating) {
      newNumberOfStars = 0;
    } else {
      newNumberOfStars = starSelected;
    }
    ViewedSongsActions.postNewSongRating(this.props.songId, newNumberOfStars, this.props.isInQueueTable, this.props.isInRadioTable);
  },

  render: function() {
    // Note: Stars are reversed due to the lack of a CSS previous selector
    let stars = [4, 3, 2, 1].map((value) => {
        return (
          <SingleStar numberOfStarsSelected={this.props.starRating}
                starNumber={ value }
                handleStarClick={this.handleStarClick}
                key={ value }
          />
        );
    });
    return (
      <div className="rating">
        { stars }
      </div>
    );
  }

});


module.exports = RatingStars;
