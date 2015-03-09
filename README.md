# PropChat

##Description
PropChat is a real-time mobile chat app using Firebase's powerful API to store and sync data instantly. The app is built leveraging the Ionic Framework and Angular JS to create a hybrid webapp with a truly native-like experience. The app is written solely using client side web technology wrapped in Cordova's magic allowing access to the phone's sensors and hardware. This approach enables PropChat and many applications like it to be built quickly without the need for writing natively, as well as server side code in this case.

##User Stories
You can find feature sets and my breakdown of PropChat's user experience here on Waffle.io, Github's version of Trello. [![Stories in Ready](https://badge.waffle.io/alexhidalgo/PropChat.png?label=ready&title=Ready)](https://waffle.io/alexhidalgo/PropChat)

##Wireframes
Check out wireframes built using Moqups, a simple yet powerful prototyping tool for both UX designers and developers.

##Interactive Prototype
Here is an interactive prototype of PropChat that you can view online or download to your phone! Prototyping is an important tool for every designer and developer which is why making it interactive to show user workflow through the app is super important.

##Models
- User
	1. Email Type: String Unique: True
	2. Password Type: String Unique: True

- Chat Room
	1. Name Type: String Unique: True
	2. Messages Type: String Unique: False

##Technologies
	-APIs
		-Firebase

	-Plugins
		-Angular UI Router

	-Libraries
		-LoDash

	-Frameworks
		-Angular JS
		- Ionic
