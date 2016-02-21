// ==UserScript==
// @name        Cookie Clicker Clicking CPS
// @namespace   CookieClickerClickCPS
// @description Shows your clicking within the CPS count of Cookie Clicker
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     1
// @grant       none
// ==/UserScript==
Game.AE_realMouseCps = 0;
Game.AE_clicksThisTimePeriod = 0;
Game.AE_mouseCpsUpdateFrequency = 2;
Game.AE_startClickCpsTime = Date.now();
AE_lerp = function (v0, v1, t) {
  return v0 + t*(v1-v0);
}
Game.AE_ClickCookie = function (event, amount)
{
  var now = Date.now();
  if (event) event.preventDefault();
  if (Game.OnAscend || Game.AscendTimer > 0) {
  } 
  else if (now - Game.lastClick < 1000 / 250) {
  } 
  else
  {
    if (now - Game.lastClick < 1000 / 15)
    {
      Game.autoclickerDetected += Game.fps;
      if (Game.autoclickerDetected >= Game.fps * 5) Game.Win('Uncanny clicker');
    }
    var amount = amount ? amount : Game.computedMouseCps;
    Game.Earn(amount);
    Game.handmadeCookies += amount;
    if (Game.prefs.particles)
    {
      Game.particleAdd();
      Game.particleAdd(Game.mouseX, Game.mouseY, Math.random() * 4 - 2, Math.random() * - 2 - 2, Math.random() * 0.5 + 0.2, 1, 2);
    }
    if (Game.prefs.numbers) Game.particleAdd(Game.mouseX + Math.random() * 8 - 4, Game.mouseY - 8 + Math.random() * 8 - 4, 0, - 2, 1, 4, 2, '', '+' + Beautify(amount, 1));
    for (var i in Game.customCookieClicks) {
      Game.customCookieClicks[i]();
    }
    Game.playCookieClickSound();
    Game.cookieClicks++;
  }
  Game.lastClick = now;
  Game.Click = 0;
  //BEGIN MODIFIED CODE
  Game.AE_clicksThisTimePeriod++;
  //END MODIFIED CODE
}
Game.AE_ComputeRealMouseCps = function ()
{
  Game.AE_realMouseCps = AE_lerp(Game.AE_realMouseCps, Game.AE_clicksThisTimePeriod * Game.computedMouseCps * Game.AE_mouseCpsUpdateFrequency, 0.8);
  Game.AE_clicksThisTimePeriod = 0;
}
Game.AE_Draw = function ()
{
  Game.DrawBackground();
  Timer.track('end of background');
  if (!Game.OnAscend)
  {
    var unit = (Math.round(Game.cookiesd) == 1 ? ' cookie' : ' cookies');
    var str = Beautify(Math.round(Game.cookiesd));
    if (Game.cookiesd >= 1000000) //dirty padding
    {
      var spacePos = str.indexOf(' ');
      var dotPos = str.indexOf('.');
      var add = '';
      if (spacePos != - 1)
      {
        if (dotPos == - 1) add += '.000';
         else
        {
          if (spacePos - dotPos == 2) add += '00';
          if (spacePos - dotPos == 3) add += '0';
        }
      }
      str = [
        str.slice(0, spacePos),
        add,
        str.slice(spacePos)
      ].join('');
    }
    if (str.length > 11 && !Game.mobile) unit = '<br>cookies';
    str += unit;
    if (Game.prefs.monospace) str = '<span class="monospace">' + str + '</span>';
    //BEGIN MODIFIED CODE
    str = str + '<div style="font-size:50%;"' + (Game.cpsSucked > 0 ? ' class="warning"' : '') + '>per second : ' + Beautify(Game.cookiesPs * (1 - Game.cpsSucked), 1) + '</div><div style="font-size:50%;">clicked per second: ' + Beautify(Game.AE_realMouseCps, 1) + '</div>'; //display cookie amount
    //END MODIFIED CODE
    l('cookies').innerHTML = str;
    l('compactCookies').innerHTML = str;
    Timer.track('cookie amount');
    if (Game.drawT % 5 == 0)
    {
      //if (Game.prefs.monospace) {l('cookies').className='title monospace';} else {l('cookies').className='title';}
      var lastLocked = 0;
      for (var i in Game.Objects)
      {
        var me = Game.Objects[i];
        //make products full-opacity if we can buy them
        var classes = 'product';
        var price = me.bulkPrice;
        if (Game.cookiesEarned >= me.basePrice || me.bought > 0) {
          classes += ' unlocked';
          lastLocked = 0;
          me.locked = 0;
        } else {
          classes += ' locked';
          lastLocked++;
          me.locked = 1;
        }
        if ((Game.buyMode == 1 && Game.cookies >= price) || (Game.buyMode == - 1 && me.amount > 0)) classes += ' enabled';
         else classes += ' disabled';
        if (lastLocked > 2) classes += ' toggledOff';
        me.l.className = classes;
        //if (me.id>0) {l('productName'+me.id).innerHTML=Beautify(me.storedTotalCps/Game.ObjectsById[me.id-1].storedTotalCps,2);}
      }      //make upgrades full-opacity if we can buy them

      var lastPrice = 0;
      for (var i in Game.UpgradesInStore)
      {
        var me = Game.UpgradesInStore[i];
        if (!me.bought)
        {
          var price = me.getPrice();
          var canBuy = (Game.cookies >= price);
          var enabled = (l('upgrade' + i).className.indexOf('enabled') > - 1);
          if ((canBuy && !enabled) || (!canBuy && enabled)) Game.upgradesToRebuild = 1;
          if (price < lastPrice) Game.storeToRefresh = 1; //is this upgrade less expensive than the previous one? trigger a refresh to sort it again
          lastPrice = price;
        }
        if (me.timerDisplay)
        {
          var T = me.timerDisplay();
          if (T != - 1)
          {
            if (!l('upgradePieTimer' + i)) l('upgrade' + i).innerHTML = l('upgrade' + i).innerHTML + '<div class="pieTimer" id="upgradePieTimer' + i + '"></div>';
            T = (T * 144) % 144;
            l('upgradePieTimer' + i).style.backgroundPosition = ( - Math.floor(T % 18)) * 48 + 'px ' + ( - Math.floor(T / 18)) * 48 + 'px';
          }
        }        //if (me.canBuy()) l('upgrade'+i).className='crate upgrade enabled'; else l('upgrade'+i).className='crate upgrade disabled';

      }
    }
    Timer.track('store');
    if (Game.PARTY) //i was bored and felt like messing with CSS
    {
      var pulse = Math.pow((Game.T % 10) / 10, 0.5);
      Game.l.style.filter = 'hue-rotate(' + ((Game.T * 5) % 360) + 'deg) brightness(' + (150 - 50 * pulse) + '%)';
      Game.l.style.webkitFilter = 'hue-rotate(' + ((Game.T * 5) % 360) + 'deg) brightness(' + (150 - 50 * pulse) + '%)';
      Game.l.style.transform = 'scale(' + (1.02 - 0.02 * pulse) + ',' + (1.02 - 0.02 * pulse) + ') rotate(' + (Math.sin(Game.T * 0.5) * 0.5) + 'deg)';
      l('wrapper').style.overflowX = 'hidden';
      l('wrapper').style.overflowY = 'hidden';
    }
    Timer.clean();
    if (Game.prefs.animate && ((Game.prefs.fancy && Game.drawT % 1 == 0) || (!Game.prefs.fancy && Game.drawT % 10 == 0)) && Game.AscendTimer == 0 && Game.onMenu == '') Game.DrawBuildings();
    Timer.track('buildings');
    Game.textParticlesUpdate();
    Timer.track('text particles');
  }
  Game.NotesDraw();
  Timer.track('notes');
  //Game.tooltip.update();//changed to only update when the mouse is moved
  for (var i in Game.customDraw) {
    Game.customDraw[i]();
  }
  Game.drawT++;
  if (Game.prefs.altDraw) requestAnimationFrame(Game.Draw);
}

//BINDINGS
Game.ClickCookie = function (event, amount)
{
  Game.AE_ClickCookie(event, amount);
}
Game.Draw = function ()
{
  Game.AE_Draw();
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