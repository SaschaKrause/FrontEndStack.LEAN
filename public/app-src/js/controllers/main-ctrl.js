angular.module('controller.main', []).controller('MainCtrl', ["$scope", 'RestService' ,'socket', function ($scope, RestService, socket) {
  "use strict";

  $scope.message = "Hello World.";
  $scope.dings = RestService.answer;


  socket.on('news', function(data){
     console.log("COOROOROORORORORORO " +data.hello);
  });

  $scope.send = function() {
    socket.emit('counter.start', {msg: 'emitted'});
  };
}]);

