import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants     from './../Constants/Action_Constants.jsx';
import FunctionalUtilities from './../Utilities/Functional_Utilities.jsx';

const FriendsStore = new Store(Dispatcher);

let _friends = window.friendsListOnLoad.map(function(friend) {
  friend.backgroundColor = FunctionalUtilities.randomRGBValue();
  return friend;
});

let _suggestedFriends = [];



let updateToReflectDownloadedSocialContent = function(socialContent) {
  _friends = socialContent.friends;
  _suggestedFriends = socialContent.suggested_friends;
};


let updateToReflectNewFriend = function(friend) {
  _friends.unshift(friend);

  let newSuggestedFriends = [];
  _suggestedFriends.forEach(function(friendInList, id) {
    if (friendInList.id !== friend.id) {
      newSuggestedFriends.push(friendInList);
    }
  });
  _suggestedFriends = newSuggestedFriends;
};

let updateToReflectDestroyedFriend = function(friend) {
  let newFriends = [];
  _friends.forEach(function(friendInList, id) {
    if (friendInList.id !== friend.id) {
      newFriends.push(friendInList);
    }
  });
  _friends = newFriends;
};




FriendsStore.friends = function() {
  return _friends;
};

FriendsStore.suggestedFriends = function() {
  return _suggestedFriends;
};


FriendsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ActionConstants.NOTIFY_FRIENDS_STORE_OF_UPDATED_SOCIAL_CONTENT:
      console.log(payload);
      updateToReflectDownloadedSocialContent(payload.socialContent)
      this.__emitChange();
      break;
    case ActionConstants.NOTIFY_FRIENDS_STORE_OF_NEW_FRIENDSHIP:
      console.log(payload);
      updateToReflectNewFriend(payload.friend)
      this.__emitChange();
      break;
    case ActionConstants.NOTIFY_FRIENDS_STORE_OF_DESTROYED_FRIENDSHIP:
      console.log(payload);
      updateToReflectDestroyedFriend(payload.unfriendedFriend)
      this.__emitChange();
      break;
  }
};


module.exports = FriendsStore;
