// ==UserScript==
// @name        Cookie Clicker Clicking CPS
// @namespace   CookieClickerClickCPS
// @description Shows your clicking within the CPS count of Cookie Clicker
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     2
// @grant       none
// ==/UserScript==
Game.AE_realMouseCps = 0;
Game.AE_clicksThisTimePeriod = 0;
Game.AE_mouseCpsUpdateFrequency = 2;
Game.AE_startClickCpsTime = Date.now();
AE_lerp = function (v0, v1, t) {
  return v0 + t*(v1-v0);
}
Game.AE_ComputeRealMouseCps = function ()
{
  Game.AE_realMouseCps = AE_lerp(Game.AE_realMouseCps, Game.AE_clicksThisTimePeriod * Game.computedMouseCps * Game.AE_mouseCpsUpdateFrequency, 0.8);
  Game.AE_clicksThisTimePeriod = 0;
}

//duplicate ClickCookie functions before changing them
Game.AE_ClickCookie = Game.ClickCookie; 
Game.AE_Draw = Game.Draw

//BINDINGS
Game.ClickCookie = function (event, amount)
{
  Game.AE_ClickCookie(event, amount);
  Game.AE_clicksThisTimePeriod++;
}
Game.Draw = function ()
{
  Game.AE_Draw();
  str = str + '<div style="font-size:50%;"' + (Game.cpsSucked > 0 ? ' class="warning"' : '') + '>per second : ' + Beautify(Game.cookiesPs * (1 - Game.cpsSucked), 1) + '</div><div style="font-size:50%;">clicked per second: ' + Beautify(Game.AE_realMouseCps, 1) + '</div>'; //display cookie amount
}
if (!Game.touchEvents)
{
  AddEvent(bigCookie, 'click', Game.ClickCookie);
} 
else
{
  AddEvent(bigCookie, 'touchend', Game.ClickCookie);
}
setInterval(Game.AE_ComputeRealMouseCps, 1000/Game.AE_mouseCpsUpdateFrequency);