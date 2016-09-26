"require strict";

import ActionConstants    from './../Constants/Action_Constants.jsx';
import APIHandler         from './../Utilities/API_Handler.jsx';
import Dispatcher         from './../Dispatcher/Dispatcher.jsx';


module.exports = {

  retrieveFeaturedContent() {
    APIHandler.retrieveFeaturedContent(this.informFeaturedContentStoreOfFeaturedContent)

  },

  informFeaturedContentStoreOfFeaturedContent(featuredContent) {
    Dispatcher.dispatch({
      actionType: ActionConstants.STORE_FEATURED_CONTENT_IN_FEATURED_CONTENT_STORE,
      featuredContent:      featuredContent,
    });

  },

};
