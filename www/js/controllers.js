angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('AllCtrl', function($scope) {
  $scope.all = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('ItemCtrl', function($scope, $stateParams) {
})
