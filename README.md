![Travis Status](https://travis-ci.org/marcelodeveloper/angularjs-youtube.svg?branch=master)

# A youtube app using angularjs

> This app was created with *angularjs* using [Youtube API V3](https://developers.google.com/youtube/v3/?hl=en).

# How to start?

```sh
$ npm install -g gulp && npm install -g bower
```

# Install dependencies

```sh
$ npm install && bower install
```

Now run ```$ gulp``` to compile css, html and js files

See the result on the browser, do enter in /public directory and run a simple server in *Python*

```sh
$ python -m SimpleHTTPServer
```

At moment the app show only videos by a *query*. You can choose a default query in ```src/assets/js/controllers/YoutubeController.js```

```js
// default query
$scope.query = 'Red Hot Chili Peppers';
```

If you want only use the YoutubeService to get the videos in your apps. YoutubeService can do this. You can config the basic params as maxResults and your app key in. ```src/assets/js/services/YoutubeService.js```

```js
var API = {
  url: 'https://www.googleapis.com/youtube/v3', // google api v3
  params: {
    key: 'yourkey', // your secret key
    maxResults: 20, // max results per page
    part: 'snippet', // groups of properties as player, status, topicDetails
    type: 'video' // video, channel, playlist
  }
};
```

# Contribute

If you have something to say, add or remove. You're welcome.

 - Fork the repository
 - Commit your changes
 - Create a new pull request
