# [Jounce Streaming Music Radio][jounce]

[Jounce][jounce] is a streaming music radio service implemented in React-on-Rails and deployed to production via use of AWS and Docker.

Explore and listen at [jounce.se][jounce]

#### Dashboard
![dashboardView]

From the dashboard, users can listen to and discover their new favorite songs, all in one location.

##### Features
* Follow your friends - see which song they've listened to most recently
* Loop through playlists or individual tracks
* Use the optional shuffle mode
* Form playlists of your favorite songs
* Search for your favorite songs, playlists, and friends from the convenient search bar at the top of the console
* Seek through a song or change your listening volume using the special purpose bars at the bottom of the console
* Click through the special viewing pages for albums, artists, and playlists
* Store your favorite albums, artists, and songs and access them through the handy navbar on the left of the console

##### Implementation
* Background client-side daemon is used to handle user requests and song progress
* React's virtual DOM allows for lightning-quick rerendering without requiring new pages to be sent from the server. Modals appear/disappear using React rather than toggling CSS display properties.
* Back end structure is RESTful and all the data requests use AJAX and are fulfilled with a JSON API.

#### Upsell Subscriber Page
![premiumPayView]

Jounce operates under a two-tier subscriber model.

##### Features
* Freemium users are exposed to sponsored advertisements, which occur in between song plays
* Premium users are charged a monthly subscription fee to forgo these commercial interruptions

##### Implementation
* Jounce uses Stripe to securely handle customer transactions without the dangers of storing sensitive customer information in Jounce's AWS RDS database.

#### Landing Page
![landingView]

##### Features:
* Users accounts can be connected directly to Facebook

## Planning Documentation
##### [View planning-stage wireframes][wireframe]






## Technologies Used

* [React.js][react]
* [Flux Application Architecture][flux]
* [Ruby on Rails][rubyOnRails]
* [JSON API][json]
* [PostgreSQL][psql]
* [Facebook JavaScript SDK][facebook]
* [Stripe API][stripe]
* [Amazon Elastic Cloud Compute (AWS EC2)][ec2]
* [Amazon Simple Storage Service (AWS S3)][s3]
* [Amazon Relational Database Service (AWS RDS)][rds]
* [Docker][docker]







[jounce]: http://www.jounce.se/
[wireframe]: ./docs/wireframe.png

[dashboardView]: ./docs/dashboard.png
[premiumPayView]: ./docs/premium.png
[landingView]: ./docs/landing.png

[react]: https://facebook.github.io/react/
[flux]: https://facebook.github.io/flux/docs/overview.html
[rubyOnRails]: http://rubyonrails.org/
[json]: http://jsonapi.org/
[psql]: https://www.postgresql.org/
[facebook]: https://developers.facebook.com/docs/javascript
[stripe]: https://stripe.com/docs/api
[ec2]: https://aws.amazon.com/ec2/
[s3]: https://aws.amazon.com/s3/
[rds]: https://aws.amazon.com/rds/
[docker]: https://www.docker.com/
