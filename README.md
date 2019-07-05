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