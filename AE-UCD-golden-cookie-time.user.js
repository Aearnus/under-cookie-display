// ==UserScript==
// @name        UCD Golden Cookie timer
// @namespace   http://github.com/Aearnus/
// @description Shows the minimum time until the next golden cookie in the UCD
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     1
// @grant       none
// ==/UserScript==

setTimeout(function(){
	Game.UCD.goldenCookieTimerDisplay = document.createElement("div");
	Game.UCD.goldenCookieTimerDisplay.setAttribute("style", "font-size: 50%");
	l("underCookieDisplay").appendChild(Game.UCD.goldenCookieTimerDisplay);
	setInterval(function() {
		Game.UCD.goldenCookieTimerDisplay.innerHTML = "time until next golden cookie: "
	}, 1000)
}, 4500);