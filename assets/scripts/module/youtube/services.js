(function() {
	'use strict';

	angular.module('App.youtube')
	.service('YoutubeService', YoutubeService);

	YoutubeService.$inject = ['$http'];

	function YoutubeService($http) {
		var YoutubeAPI = {
			defaultParams: '&orderBy=published&start-index=1',
	        userUploads: 'http://gdata.youtube.com/feeds/api/users/{username}/uploads?alt=json',
	        singleVideo: 'https://gdata.youtube.com/feeds/api/videos/{videoid}?alt=json',
	        videos: 'http://gdata.youtube.com/feeds/api/videos?q={keyword}&alt=json'
	    };

	    return {
	    	getUserVideos: function(query) {
	    		var url = YoutubeAPI.userUploads.replace(/(\{username\})/g, query);
	    		return $http.get(url + YoutubeAPI.defaultParams);
	    	},

	    	getVideo: function(id) {
	    		var url = YoutubeAPI.singleVideo.replace(/(\{videoid\})/g, id);
	    		return $http.get(url);
	    	},

	    	getVideos: function(query) {
	    		var url = YoutubeAPI.videos.replace(/(\{keyword\})/g, query);
	    		return $http.get(url);
	    	}
	    };
	}

})();