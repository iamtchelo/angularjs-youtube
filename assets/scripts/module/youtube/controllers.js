(function() {
	'use strict';

	angular.module('App.youtube')
	.controller('YoutubeController', YoutubeController);

	// Inject DI
	YoutubeController.$inject = ['$scope', '$http', '$sce', 'YoutubeService'];

	function YoutubeController($scope, $http, $sce, YoutubeService) {

		// default channel
		$scope.query = 'googledevelopers';

		$scope.$watch('query', function(data) {
			YoutubeService.getUserVideos(data)
			.success(function(data) {
          parseData(data);
          console.log($scope.videos);

			}).error(function(error) {
				console.log('Error:', error);
			});
		});

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
        if (data.feed.entry.length > 0) {
            $scope.videos = [];

            data.feed.entry.forEach(function(element, index) {
                var video = {
                     id: getVideoId(element.link[0].href),
                     title: element.title.$t,
                     link: element.link[0].href,
                     viewCount: element.yt$statistics.viewCount,
                     category: element.media$group.media$category[0].label,
                     images: {
                         cover: {
                              src: element.media$group.media$thumbnail[0].url,
                              height: element.media$group.media$thumbnail[0].height,
                              width: element.media$group.media$thumbnail[0].width
                         },
                         thumbnail: {
                              src: element.media$group.media$thumbnail[1].url,
                              height: element.media$group.media$thumbnail[1].height,
                              width: element.media$group.media$thumbnail[1].width
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
