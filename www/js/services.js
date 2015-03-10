angular.module('app.services', ['firebase'])

  .factory("Auth", ['$firebaseAuth', '$rootScope',
  	function($firebaseAuth, $rootScope) {
    var ref = new Firebase('https://torrid-fire-3981.firebaseio.com');
    return $firebaseAuth(ref);
  }])

  .factory('Chats', function($firebase, Rooms) {
  	var selectedRoomId;

  	var ref = new Firebase(firebaseUrl);
  	var chats;

  	return {
  		all: function() {
  				return chats;
  		},
  		remove: function (chats) {
  			chats.$remove(chat).then(function(ref) {
  				ref.key() === chat.$id //true item has been removed
  			});
  		},
  		get: function(chatId) {
  			for (var i = 0; i < chats.length; i++) {
  				if (chats[i].id === pareseInt(chatId)) {
  					return chats[i];
  				}
  			}
  			return null;
  		},
  		getSelectedRoomName: function() {
  			var selectedRoom;
  			if (selectedRoomId && selectedRoomId != null) {
  				selectedRoom = Rooms.get(selectedRoomId);
  				if(selectedRoom)
  					return selectedRoom.name;
  				else
  					return null;
  			} else
  					return null;
  		},
  		selectRoom: function (roomId) {
  			console.log("selecting the room with id " + roomId);
  			selectedRoomId = roomId;
  			if (!isNaN(roomId)) {
  				chats = $firebase(ref.child('rooms').child(selectedRoomId).child('chats')).$asArray();
  			}
  		},
  		send: function (from, message) {
  			console.log("sending message from: " + from.displayName + " & message is " + message);
  			if (from && message) {
  				var chatMessages = {
  					from: from.displayName,
  					message: message,
  					createdAt: Firebase.ServerValue.TIMESTAMP
  				};
  				chats.$add(chatMessages).then(function(data) {
  					console.log("message added");
  				});
  			}
  		}
  	};
  })
.factory('Rooms', function ($firebase) {
	// Might use a resource here that returns a JSON array
	var ref = new Firebase(firebaseUrl);
	var rooms = $firebase(ref.child('rooms')).$asArray();

	return {
		all: function() {
			return rooms;
		},
		get: function (roomId) {
			//simple index lookup
			return rooms.$getRecord(roomId);
		}
	};
});

// .factory('Chats', function() {
//   // Might use a resource here that returns a JSON array

//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'Ben Sparrow',
//     lastText: 'You on your way?',
//     face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
//   }, {
//     id: 1,
//     name: 'Max Lynx',
//     lastText: 'Hey, it\'s me',
//     face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
//   }, {
//     id: 2,
//     name: 'Andrew Jostlin',
//     lastText: 'Did you get the ice cream?',
//     face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
//   }, {
//     id: 3,
//     name: 'Adam Bradleyson',
//     lastText: 'I should buy a boat',
//     face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
//   }, {
//     id: 4,
//     name: 'Perry Governor',
//     lastText: 'Look at my mukluks!',
//     face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
//   }];

//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// });
