"require strict";

import React                    from 'react';

import FriendsStore             from './../../Stores/Friends_Store.jsx';
import FriendsActions           from './../../Actions/Friends_Actions.jsx';

import FriendContainer          from './Friend_Container.jsx';

var Social = React.createClass({

  handleRequestToFollowUser() {
    FriendsActions.sendRequestToFollowUser(this.props.friend.id);
  },

  handleRequestToUnfollowUser() {
    FriendsActions.sendRequestToUnfollowUser(this.props.friend.id);
  },

  renderFriendButton() {
    if (this.props.friend.is_a_friend_of_current_user) {
      return (
        <button onClick={this.handleRequestToUnfollowUser}>
          Unfollow
        </button>
      );
    } else {
      return (
        <button onClick={this.handleRequestToFollowUser} >
          Follow
        </button>
      );
    }
  },

  render() {
    let friend = this.props.friend;
    return (
      <div className="friend-container">

        <div className="social-friend-username">
          {friend.username}
          <br/>Last artist listened to:{friend.name_of_artist_of_last_song_listened_to}
          <br/>Last album listened to:{friend.title_of_album_of_last_song_listened_to}
          <br/>Last Song listened to:{friend.title_of_last_song_listened_to}
        </div>

        <div className="social-follow-unfollow-button-container">
          { this.renderFriendButton() }
        </div>

        <img className="social-friend-photo" src={friend.profile_image_url}></img>
      </div>
    );
  }

});

module.exports = Social;
