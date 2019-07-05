# Auger
#### Java script event augment

## Motivation
As javascript is now and has been for a while its been quite troublesome and tireing to simply add eventlistners to each element.
It would be allot simpler to just define the function hooks in the elements themselves much like the `onClick` events already present.

However, this project should take that to the next level allowing you to chain together asyncronous calls and also have them pass paramaters down the call stack at runtime.

## Goal
An effective streamlined way of creating, regestering and excecuting multiple or single functions asyncronysly with little effort.

## Known bugs
+	Some problems in seperating event instance variables

## Features
+	Namespace based function resolution e.g. `object.function`
+	Async excecution e.g

		function start(event, next, auger){
			... Do something here ...
			next() // continue to the next function
		}
+	Dynamic function linking on child append
+ 	Super simple to use

## Usage
Adding any event listner to an element looks like this:

		<div auger auger-event="function.one;function.two"></div>
Any element that needs to be handled as an auger is spesified with the `auger` attribute
after that any paramater starting with `auger-` will be handled as an event keyword.

For instance `auger-click` will bind an on click event. You can do this with any events you desire.

The event callbacks take 3 arguments:
1.	event 	: The original event object
2.	next	: The callback to be called once your callback has concluded
3.	auger	: The Auger for the element

It will look something like this

		function myCallback(event, next, auger){
			...some thing here...
			next();
		}

Failing to call `next` will result in the termination of the event thread.