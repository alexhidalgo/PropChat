// Ionic Starter App

var firebaseUrl = "https://torrid-fire-3981.firebaseio.com";

function onDeviceReady() {
    angular.bootstrap(document, ["app"]);
}

document.addEventListener("deviceready", onDeviceReady, false);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'firebase', 'app.services'])

  .run(function($ionicPlatform, $rootScope, $location, Auth, $ionicLoading) {

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      // To Resolve Bug
      ionic.Platform.fullScreen();

      $rootScope.firebaseUrl = firebaseUrl;
      $rootScope.displayName = null;

       Auth.$onAuth(function (authData) {
        if (authData) {
          console.log("Logged in as:", authData.uid);
        } else {
          console.log("Logged out");
          $ionicLoading.hide();
          $location.path('/login');
        }
    });

      $rootScope.logout = function () {
        console.log("Logging out from the app");
        $ionicLoading.show({
          template: 'Logging Out...'
        });
        Auth.$unauth();
      };

      $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
          $location.path("/login");
        }
      });
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the Login View
    .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth",
      function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$waitForAuth();
      }]
    }
  })

    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tab.html",
    resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the state above
      "currentAuth": ["Auth",
      function(Auth) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireAuth();
      }]
    }
  })

  // Each tab has its own nav history stack:

  // .state('tab.dash', {
  //   url: '/dash',
  //   views: {
  //     'tab-dash': {
  //       templateUrl: 'templates/tab-dash.html',
  //       controller: 'DashCtrl'
  //     }
  //   }
  // })

  .state('tab.rooms', {
      url: '/rooms',
      views: {
        'tab-rooms': {
          templateUrl: 'templates/tab-rooms.html',
          controller: 'RoomsCtrl'
        }
      }
    })
    .state('tab.chat', {
      url: '/chat/:roomId',
      views: {
        'tab-chat': {
          templateUrl: 'templates/tab-chat.html',
          controller: 'ChatCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
