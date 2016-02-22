// ==UserScript==
// @name        UCD Golden Cookie timer
// @namespace   http://github.com/Aearnus/
// @description Shows the minimum time until the next golden cookie in the UCD
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     1
// @grant       none
// ==/UserScript==

setTimeout(function(){
	Game.UCD.goldenCookieMinTimerDisplay = document.createElement("div");
	Game.UCD.goldenCookieMinTimerDisplay.setAttribute("style", "font-size: 50%");
	l("underCookieDisplay").appendChild(Game.UCD.goldenCookieMinTimerDisplay);
	Game.UCD.goldenCookieMaxTimerDisplay = document.createElement("div");
	Game.UCD.goldenCookieMaxTimerDisplay.setAttribute("style", "font-size: 50%");
	l("underCookieDisplay").appendChild(Game.UCD.goldenCookieMaxTimerDisplay);
	setInterval(function() {
		var minTimeRemaining = Game.goldenCookie.minTime - Game.goldenCookie.time;
		Game.UCD.goldenCookieMinTimerDisplay.innerHTML = "min time until next golden cookie: " + (minTimeRemaining <= 0 ? "none, get ready" : minTimeRemaining);
		var maxTimeRemaining = Game.goldenCookie.maxTime - Game.goldenCookie.time;
		Game.UCD.goldenCookieMaxTimerDisplay.innerHTML = "max time until next golden cookie: " + maxTimeRemaining;
	}, 500)
}, 4500);