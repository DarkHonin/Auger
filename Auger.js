class Auger{
	constructor(element, events={}){	// element = HTML element, events = {event : [something.something, more.more, andsoon]}
		this.owner = element;
		this.owner.auger = this;
		this.auger_hooks = {...Auger.getElementAugerConfig(element), ...events}
		this.callbacks = {}
		Auger.bindEvents(this, this.auger_hooks)
		Auger.Augers.push(this)
	}

	dispatch(event){
		var events = this.callbacks[event.type]
		var i = 0;
		this.locals = {}
		var next = () => {
			i++;
			if(i < events.length)
				events[i] (event, next=next, this)
		}
		events[i](event, next=next, this)
	}
}

Auger.Augers = []

Auger.getElementAugerConfig = (au) =>{
	ret = {}
	if(!au["attributes"]) return {};
	attrs = Array.prototype.slice.call(au.attributes)
	attrs = attrs.filter((atr) => {
		return (atr.name.startsWith("auger-"))
	})
	attrs.forEach(at=>{
		ret[at.name.split('-')[1]] = at.value.split(";")
	})
	return ret;
}

// Takes the auger to accept the event callbacks, the trigger and the full callback string
Auger.bindEvents = (au, events) => {	
	for(var key in events){
		au.owner.addEventListener(key, (r) => au.dispatch(r))
		events[key].forEach(event => {
			fn = Auger.resolveCallbackString(event);
		
			if(typeof fn !== "function")
				return Auger.error(`Could not Resolved ${key} : ${event}`);
			if(!au.callbacks[key]) au.callbacks[key] = []
			au.callbacks[key].push(fn)
			Auger.log(`Resolved ${key} : ${event}`)
		})
	}
},

Auger.resolveCallbackString = (str) => {	// Takes the callback string and tries to find the function it relates too
	parts = str.split(".").reverse()
	start = window
	while(part = parts.pop()){
		if(!start[part])
			return false && Auger.log(`Could not link function: ${str}... part not found : ${part}`);
		start = start[part]
	}
	return start;
},

Auger.config = {
	debug : true,
	mutationConfig : { attributes: true, childList: true, characterData: true, subtree: true }
}

Auger.log = (...args) => {
	if(Auger.config.debug)
		console.log(...args)
}

function documentChanged(e, ob){
	e.forEach(q => {
		Array.prototype.slice.call(q.addedNodes).forEach(n => {
			if(n.hasAttribute("auger")) new Auger(n)
		})
	/*
		if(e.type == "childList")
			for(var n in ){
				console.log(n)
				if(e.addedNodes[n].hasAttribute("auger")) new Auger(e.addedNodes[n])
			}*/
	})
}

const observer = new MutationObserver(documentChanged)

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll("[auger]").forEach(au => {	new Auger(au);	});
	observer.observe( document.body , Auger.config.mutationConfig )
	document.dispatchEvent(new Event("AugerInitFinished"))
})