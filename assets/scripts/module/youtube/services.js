(function() {
	'use strict';

	// API config
	var API = {
		url: 'https://www.googleapis.com/youtube/v3',
		params: {
			key: 'AIzaSyBi6WSVs3D7_93pZQxXAMYmSRPZcAncX6I',
			maxResults: 20,
			part: 'snippet'
		}
	};

	function parseParams(obj) {
		var params = '';
		for (var p in obj) {
			if ((obj.hasOwnProperty(p)) && (obj[p] !== '')) {
				params += '&' + p + '=' + obj[p];
			}
		}
		return params;
	}

	angular.module('App.youtube')
	.service('YoutubeService', YoutubeService);

	YoutubeService.$inject = ['$http'];

	function YoutubeService($http) {
    return {
			search: function(query) {
				var url = API.url + '/search/?q=' + query;
				url += parseParams(API.params);

				return $http.get(url);
			},

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
