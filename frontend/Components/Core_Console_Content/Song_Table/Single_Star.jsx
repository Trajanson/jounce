"require strict";

import React from 'react';

var SingleStar = React.createClass({
  isSelected() {
    if (this.props.numberOfStarsSelected >= this.props.starNumber) {
      return "rating-selected";
    } else {
      return "";
    };
  },

  render() {

    return(
      <span id={this.props.starNumber} onClick={ () => this.props.handleStarClick(this.props.starNumber) }
            className={this.isSelected()}>
        ☆
      </span>
    );
  }
});

module.exports = SingleStar;
