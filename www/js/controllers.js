angular.module('app.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope) {
	console.log('login ctrl initialized');

	var ref = new Firebase($scope.firebaseUrl);
	var auth = $firebaseAuth(ref);

	$ionicModal.fromTemplateUrl('templates/signup.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.createUser = function(user) {
		console.log("Creat User Function called");
		if (user && user.email && user.password && user.displayname) {
			$ionicLoading.show({
				template: 'Signing Up...'
			});
			auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function(userData) {
				alert("User created successfully!");
				ref.child("users").child(userData.uid).set({
					email: user.email,
					displayName: user.displayname
				});
				$ionicLoading.hide();
				$scope.modal.hide();
			}).catch(function (error) {
				alert("Error" + error);
				ionicaLoading.hide();
			});
		} else {
				alert("Please fill all details");
			}
	};

	$scope.signIn = function(user) {
		if(user && user.email && user.pwdForLogin) {
			$ionicLoading.show({
				template: 'Signing In...'
			});
			auth.$authWithPassword({
				email: user.email,
				password: user.pwdForLogin
			}).then(function(authData) {
				console.log("Logged in as " + authData.uid);
				ref.child("users").child(authData.uid).once('value', function(snapshot) {
					var val = snapshot.val();
					// To Update AngularJS $scope either use $apply or $timeout
					$scope.$apply(function () {
						$rootScope.displayName = val;
					});
				});
				$ionicLoading.hide();
				$state.go('tab.rooms');
			}).catch(function(error) {
					alert("Authentication failed" + error.message);
					$ionicLoading.hide();
			});
		} else {
				alert ("Please enter both email and password");
		}
	};

})

.controller('ChatCtrl', function($scope, Chats, $state) {
	console.log('ChatCtrl initialized');
	$scope.IM = {
		textMessage: ""
	};

	Chats.selectRoom($state.params.roomId);

	var roomName = Chats.getSelectedRoomName();

	//Fetching chats only if Room is selected
	if (roomName) {
		$scope.roomName = " - " + roomName;
		$scope.chats = Chats.all();
	}
	$scope.sendMessages = function (msg) {
		console.log(msg);
		Chats.send($scope.displayName, msg);
		console.log(msg);
		$scope.IM.textMessage = "";
	};

  $scope.remove = function (chat) {
  	Chats.remove(chat);
  };
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // }
})

.controller('RoomsCtrl', function($scope, Rooms, Chats, $state) {
	// console.log('RoomsCtrl initialized');
	$scope.rooms = Rooms.all();
  // $scope.chat = Chats.get($stateParams.chatId);
  $scope.openChatRoom = function(roomId) {
  	$state.go('tab.chat', {
  		roomId: roomId
  	});
  };
});

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });
