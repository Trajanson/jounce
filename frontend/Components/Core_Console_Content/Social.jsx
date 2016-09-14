"require strict";

import React                    from 'react';

import FriendsStore             from './../../Stores/Friends_Store.jsx';
import FriendsActions           from './../../Actions/Friends_Actions.jsx';

import FriendContainer          from './Friend_Container.jsx';

var Social = React.createClass({

  getInitialState() {
    return ({
      friends: FriendsStore.friends(),
      suggestedFriends: [],
    });
  },

  componentDidMount() {
    this.friendsStoreListener = FriendsStore.addListener(this.updateStateToReflectFriendsStore);
    FriendsActions.retrieveSocialContent();
  },

  componentWillUnmount() {
    this.friendsStoreListener.remove();
  },

  updateStateToReflectFriendsStore () {
    let friends = FriendsStore.friends(),
        suggestedFriends = FriendsStore.suggestedFriends();
    this.setState({
      friends: friends,
      suggestedFriends: suggestedFriends,
    });

  },



  render() {
    console.log(this.state);
    let friends = this.state.friends.map(function(friend, index) {
      return (
        <FriendContainer key={ index } friend={ friend } />
      );
    });

    let suggestedFriends = this.state.suggestedFriends.map(function(suggestedFriend, index) {
      return (
        <FriendContainer key={ index } friend={suggestedFriend} />
      );
    });

    return (
      <div id="inner-core-content-container">
        Social

        <div>
          Your Friends:<br/>
          {friends}
        </div>

        <div>
          Suggested Friends:<br/>
          {suggestedFriends}
        </div>

      </div>
    );
  }

});

module.exports = Social;
