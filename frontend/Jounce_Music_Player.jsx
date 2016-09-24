import React                                      from 'react';
import ReactDOM                                   from 'react-dom';
import ReactRouter                                from 'react-router';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// COMPONENTS
import AlbumViewer                                from './components/Core_Console_Content/Album_Viewer.jsx';
import ArtistViewer                               from './components/Core_Console_Content/Artist_Viewer.jsx';
import Console                                    from './components/Console.jsx';
import Explorer                                   from './components/Core_Console_Content/Explorer.jsx';
import Social                                     from './components/Core_Console_Content/Social.jsx';
import Radio                                      from './components/Core_Console_Content/Radio.jsx';
import UserViewer                                 from './components/Core_Console_Content/User_Viewer.jsx';
import PlaylistViewer                             from './components/Core_Console_Content/Playlist_Viewer.jsx';
import FollowedAlbumsViewer                       from './components/Core_Console_Content/Followed_Albums_Viewer.jsx';
import FollowedArtistsViewer                      from './components/Core_Console_Content/Followed_Artists_Viewer.jsx';
import Queue                                      from './components/Core_Console_Content/Queue.jsx';
import SearchResultsViewer                        from './components/Core_Console_Content/Search_Results_Viewer.jsx';

const routes = (
  <Route path="/"                       component={ Console } >
    <IndexRoute                         component={ Radio } />
    <Route path="_=_"                   component={ Radio } />

    <Route path="explore"               component={ Explorer } />
    <Route path="friends"               component={ Social } />
    <Route path="radio"                 component={ Radio } />
    <Route path="queue"                 component={ Queue } />
    <Route path="playlists/:playlistId" component={ PlaylistViewer } />
    <Route path="artists/:artistId"     component={ ArtistViewer } />
    <Route path="albums/:albumId"       component={ AlbumViewer } />
    <Route path="users/:userId"         component={ UserViewer } />
    <Route path="followed_albums"       component={ FollowedAlbumsViewer } />
    <Route path="followed_artists"      component={ FollowedArtistsViewer } />
    <Route path="search_results"        component={ SearchResultsViewer } />
  </Route>
);

const appRouter = (
  <Router history={ hashHistory } routes={routes} ></Router>
);


document.addEventListener('DOMContentLoaded', function() {
  let renderingDiv = document.getElementById("content");

  ReactDOM.render(appRouter, renderingDiv);

});
