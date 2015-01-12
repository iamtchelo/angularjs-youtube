(function() {
	'use strict';

	angular.module('App.youtube')
	.service('YoutubeService', YoutubeService);

	YoutubeService.$inject = ['$http'];

	function YoutubeService($http) {
		var YoutubeAPI = {
			defaultParams: '&orderBy=published&start-index=1',
	        userUploads: 'http://gdata.youtube.com/feeds/api/users/{username}/uploads?alt=json',
	        singleVideo: 'https://gdata.youtube.com/feeds/api/videos/{videoid}?alt=json'
	    };

	    return {
	    	getUserVideos: function(query) {
	    		var url = YoutubeAPI.userUploads.replace(/(\{username\})/g, query);
	    		return $http.get(url + YoutubeAPI.defaultParams);
	    	}
	    };
	}

})();