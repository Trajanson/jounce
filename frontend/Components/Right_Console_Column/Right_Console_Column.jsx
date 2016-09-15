"require strict";

import React               from 'react';
import { Link }            from 'react-router';

import FriendsStore        from './../../Stores/Friends_Store.jsx';


var RightConsoleColumn = React.createClass({

  getInitialState() {
    return ({
      friends: FriendsStore.friends(),
    });
  },

  componentDidMount() {
    this.friendsStoreListener = FriendsStore.addListener(this.updateStateToReflectFriendsStore);
  },

  componentWillUnmount() {
    this.friendsStoreListener.remove();
  },

  updateStateToReflectFriendsStore () {
    let friends = FriendsStore.friends();
    this.setState({
      friends: friends,
    });

  },


  render() {
    const friends = this.state.friends.map(function(friend, index) {
      let imageStyle = {
        backgroundColor: friend.backgroundColor,
      };
      return (
        <div key={ index } className="followed-friend-container">
          <div className="followed-friend-username">
            <Link to={ `/users/${ friend.id }` }>
              { friend.username }
            </Link>
          </div>
          <img style={imageStyle} className="followed-friend-avatar-image" src={ friend.profile_image_url }></img>
          <div className="followed-friend-title-of-last-song-listened-to">{ friend.title_of_last_song_listened_to }</div>
          <div className="followed-friend-title-of-artist-of-last-song-listened-to">
            <Link to={ `/artists/${ friend.id_of_artist_of_last_song_listened_to }` }>
              { friend.name_of_artist_of_last_song_listened_to }
            </Link>
          </div>
          <div className="followed-friend-title-of-album-of-last-song-listened-to">
            <Link to={ `/albums/${ friend.id_of_album_of_last_song_listened_to }` }>
              { friend.title_of_album_of_last_song_listened_to }
            </Link>
          </div>
        </div>
      );
    });
    return (
      <div id="right-column">
        <div id="inner-friends-box">

          { friends }
        </div>
      </div>
    );
  }

});

module.exports = RightConsoleColumn;
