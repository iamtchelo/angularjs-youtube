(function() {
	'use strict';

	angular.module('App.youtube')
	.controller('YoutubeController', YoutubeController);

	// Inject DI
	YoutubeController.$inject = ['$scope', '$http', '$sce', 'YoutubeService'];

	function YoutubeController($scope, $http, $sce, YoutubeService) {
		// default keyworkd
		$scope.query = 'Red Hot Chilli Peppers';

		// Initial request
		YoutubeService.search($scope.query)
		.success(function(data) {
			parseData(data.items);
		}).error(function(error) {
			console.log('There was an error: ' + error);
		});

		$scope.search = function() {
			YoutubeService.search($scope.query)
			.success(function(data) {
				parseData(data.items);
			}).error(function(error) {
				console.log('There was an error: ' + error);
			});
		};

    $scope.modal = false;
    $scope.currentVideo = null;

    $scope.videoModal = function(id) {
      if (!id) {
          $scope.modal = false;
          return;
      }

      var video = 'http://www.youtube.com/embed/' + id;
      $scope.currentVideo = $sce.trustAsResourceUrl(video);
      $scope.modal = true;
    };

    $scope.closeModal = function() {
      if ($scope.modal === false) {
          return;
      }

      $scope.modal = false;
      $scope.currentVideo = null;
    };

    function parseData(data) {
			if (data.length > 0) {
				$scope.videos = [];

				data.forEach(function(item) {
					var video = {
						id: item.id.videoId,
						channelId: item.snippet.channelId,
						title: item.snippet.title,
						images: {
							default: {
								url: item.snippet.thumbnails.default.url
							},
							medium: {
								url: item.snippet.thumbnails.medium.url
							},
							high: {
								url: item.snippet.thumbnails.high.url
							}
						}
					};

					$scope.videos.push(video);
				});
			}
    }

    // Get all query params
    function queryString(url) {
      var parse_url = /^(?:([a-zA-Z]+):)?(\/{0,3})([0-9.\-a-zA-Z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
          names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'],
          query_string = {},
          result = parse_url.exec(url);

      var vars = result[6].split('&');

      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          query_string[pair[0]] = pair[1];
      }

      return query_string;
    }

    function getVideoId(url) {
      var query_string = queryString(url);
      return query_string.v;
    }
  }
})();
