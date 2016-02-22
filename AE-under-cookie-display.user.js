// ==UserScript==
// @name        Under Cookie Display
// @namespace   UnderCookieDisplay
// @description Dependency for all other Under Cookie Display things, adds the display under the cookie
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     1
// @grant       none
// ==/UserScript==
Game.UCD = {}; //object to store UCD stuff

var ucd = document.createElement("div");
ucd.setAttribute("id", "underCookieDisplay");
ucd.setAttribute("class", "title");
ucd.setAttribute("style", "position: absolute;left: 0px;top: 70%;width: 100%;text-align: center;z-index: 200;background: #000;background: rgba(0,0,0,0.4);padding: 2px 0px;");
ucd.innerHTML = "Under Cookie Display";
l("sectionLeft").appendChild(ucd);
