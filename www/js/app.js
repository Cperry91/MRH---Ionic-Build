// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//Parse.com Authentication Keys
Parse.initialize("SqcMJ0i1XGiHglxEJt0lNbJFpWGlSwLhEaKzas53", "yIwDvxQA8iu1JfcQf3dSEvpjvIYh4FKQT5M1CByd");

angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.auth', {
      url: "/auth",
      views: {
        'menuContent' :{
          templateUrl: "templates/auth.html"
        }
      }
    })

    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html"
        }
      }
    })
    .state('app.all', {
      url: "/all",
      views: {
        'menuContent' :{
          templateUrl: "templates/all.html",
          controller: 'AllCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/all/:itemId",
      views: {
        'menuContent' :{
          templateUrl: "templates/item.html",
          controller: 'ItemCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/auth');
})

// Parse services
.run(['$rootScope', function($scope) {
  $scope.scenario = 'Log in';
  $scope.currentUser = Parse.User.current();

  $scope.signUp = function(form) {
    var user = new Parse.User();
    user.set("email", form.email);
    user.set("username", form.username);
    user.set("password", form.password);
    user.set("location", form.location);
    user.set("tagline", form.tagline);

    user.signUp(null, {
      success: function(user) {
        $scope.currentUser = user;
        $scope.$apply();
      },
      error: function(user, error) {
        alert("Unable to sign up:  " + error.code + " " + error.message);
      }
    });
  };

  $scope.logIn = function(form) {
    Parse.User.logIn(form.username, form.password, {
      success: function(user) {
        $scope.currentUser = user;
        $scope.$apply();
      },
      error: function(user, error) {
        alert("Unable to log in: " + error.code + " " + error.message);
      }
    });
  };

  $scope.logOut = function(form) {
    Parse.User.logOut();
    $scope.currentUser = null;
  };

  $scope.resetPass = function(form) {
    Parse.User.requestPasswordReset("alexwhedbee@me.com", {
      success: function() {
       alert("Reset instructions have been emailed to you.");
      },
      error: function(error) {
        // Show the error message somewhere
        alert("Error: " + error.code + " " + error.message);
      }
    })
  }

}])
;
