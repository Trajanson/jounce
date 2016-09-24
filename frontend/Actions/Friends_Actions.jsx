import ActionConstants    from './../Constants/Action_Constants.jsx';
import APIHandler         from './../Utilities/API_Handler.jsx';
import Dispatcher         from './../Dispatcher/Dispatcher.jsx';


module.exports = {
  retrieveSocialContent() {
    APIHandler.requestSocialContent(this.notifyFriendsStoreOfUpdatedSocialContent);
  },

  notifyFriendsStoreOfUpdatedSocialContent(socialContent) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_FRIENDS_STORE_OF_UPDATED_SOCIAL_CONTENT,
      socialContent:      socialContent,
    });
  },



  sendRequestToFollowUser(userId) {
    APIHandler.createFriendship(userId, this.notifyFriendsStoreOfNewFriendship);
  },

  notifyFriendsStoreOfNewFriendship(friend) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_FRIENDS_STORE_OF_NEW_FRIENDSHIP,
      friend: friend,
    });
  },


  sendRequestToUnfollowUser(userId) {
    APIHandler.destroyFriendship(userId, this.notifyFriendsStoreOfRemovedFriendship);
  },

  notifyFriendsStoreOfRemovedFriendship(unfriendedFriend) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_FRIENDS_STORE_OF_DESTROYED_FRIENDSHIP,
      unfriendedFriend:      unfriendedFriend,
    });
  },


};
