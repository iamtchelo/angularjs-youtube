(function() {
	'use strict';

	angular.module('App.youtube')
	.controller('YoutubeController', YoutubeController);

	// Inject DI
	YoutubeController.$inject = ['$scope', '$http', 'YoutubeService'];

	function YoutubeController($scope, $http, YoutubeService) {

		// default channel
		$scope.query = 'ccvideira';

		$scope.$watch('query', function(data) {
			YoutubeService.getUserVideos(data)
			.success(function(data) {
          parseData(data);

			}).error(function(error) {
				console.log('Error:', error);
			});
		});

    function parseData(data) {
        if (data.feed.entry.length > 0) {
            $scope.videos = [];

            data.feed.entry.forEach(function(element, index) {
                var video = {
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
  }
	
})();