// ==UserScript==
// @name        Under Cookie Display
// @namespace   UnderCookieDisplay
// @description Dependency for all other Under Cookie Display things, adds the display under the cookie
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     1
// @grant       none
// ==/UserScript==
var ucd = document.createElement("div");
ucd.setProperty("id", "underCookieDisplay");
ucd.setProperty("class", "title");
ucd.setProperty("style", "top: 70% !important");
ucd.innerHTML = "Under Cookie Display";
l("sectionLeft").appendChild(ucd);