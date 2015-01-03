(function() {
    var app = angular.module('Youtube', []);

    var YoutubeAPI = {
        userUploads: 'http://gdata.youtube.com/feeds/api/users/{username}/uploads?alt=json'
    };
    
    // Controllers
    app.controller('YoutubeController', ['$scope', '$http', function($scope, $http) {
        $scope.query = "ccvideira";

        $scope.$watch('query', function(data) {
            $scope.getVideos(data);
        });
        
        $scope.getVideos = function(query) {
            var url = YoutubeAPI.userUploads.replace(/(\{username\})/g, query);
            
            $http.get(url).success(function(data) {                
                $scope.parseData(data.feed.entry);
            })
            .error(function(error) {
                console.log('Error: ', error);

                // tratar error aqui
            });
        };
        
        $scope.parseData = function(data) {            
            if (data.length > 0) {
                $scope.videos = [];
                
                data.forEach(function(element, index) {
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
        };
        
    }]);
    
})();









