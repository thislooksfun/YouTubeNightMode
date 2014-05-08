window.dimmer = {};

//Functions
dimmer.init = function()
{
  if (!this.checkIsVideo()) {
    return;
  }
  
  if (document.getElementById('dimmer') == null)
  {
    var container = document.getElementById('tlf-button-container');
    if (container == null) {
      container = document.createElement('span');
      container.id = 'tlf-button-container';
      container.className = 'yt-uix-button-group';
      container.setAttribute('style', 'position: relative; right: 5px');
      var headUser = document.getElementById('yt-masthead-user');
      headUser.insertBefore(container, headUser.firstChild);
    }

    this.dimmerButton = document.createElement('button');
    this.dimmerButton.id = 'dimmer';
    this.dimmerButton.onclick = function() { dimmer.toggle(); };
    this.dimmerButton.className = 'yt-uix-button yt-uix-button-default yt-uix-button-size-default';
    this.dimmerButton.innerHTML = 'Dim';
    container.appendChild(this.dimmerButton);
    
    this.divPopouts = [];
    
    this.initDivs();
    
    this.checkSize();
    window.setInterval(this.checkSize, 40);
    if (window.onresize != null) {
      this.oldResizeEvent = window.onresize;
      window.onresize = function() { dimmer.onWindowResize(); };
    }
    
    this.isNight = false;
    
    $(document).keydown(function(event) {
      if (event.keyCode == 27 && dimmer.isNight) {
        dimmer.setState("day");
      }
    });
  } else {
    this.dimmerButton = document.getElementById('dimmer');
    this.divTop = document.getElementById('dimmerDivTop');
    this.divLeft = document.getElementById('dimmerDivLeft');
    this.divRight = document.getElementById('dimmerDivRight');
    this.divBottom = document.getElementById('dimmerDivBottom');
    this.divHeader = document.getElementById('dimmerDivHeader');
    this.divPopouts = document.getElementsByName('dimmerDivPopout');
    this.isNight = (this.dimmerButton.innerHTML == "Dim")
  }
  
  this.uploader = (document.getElementsByClassName("yt-user-name")[0]).innerHTML;
  this.frameCount = 0;
  this.opacity = 0;
  
  function fixDiv() {
    var $cache = $('#dimmerDivBottom');
    var top = 50;
    if ($(window).scrollTop() > (dimmer.topPos - top)) {
      $cache.css({'position': 'fixed', 'top': top + 'px'});
      console.log("[1] " + $cache.css('top') + ", " + top);
    } else {
      $cache.css({'position': 'absolute', 'top': dimmer.topPos + 'px'});
      console.log("[2] " + $cache.css('top') + ", " + dimmer.topPos);
    }
  };
  $(window).scroll(fixDiv);
  
  this.topPos = $('#player-api').offset().bottom;
  
  document.getElementById('appbar-settings-menu').style.zIndex = 1999999997;
  
  this.setState("night");
}

dimmer.initDivs = function()
{
  this.divTop = document.createElement('div');
  this.divTop.id = 'dimmerDivTop';
  this.divTop.setAttribute('style', 'background: #000; opacity: 0.0; z-index: 1999999998; pointer-events: none; position: absolute');
  document.body.appendChild(this.divTop);
  
  this.divLeft = document.createElement('div');
  this.divLeft.id = 'dimmerDivLeft';
  this.divLeft.setAttribute('style', 'background: #000; opacity: 0.0; z-index: 2147483647; pointer-events: none; position: fixed');
  document.body.appendChild(this.divLeft);
  
  this.divRight = document.createElement('div');
  this.divRight.id = 'dimmerDivRight';
  this.divRight.setAttribute('style', 'background: #000; opacity: 0.0; z-index: 1999999998; pointer-events: none; position: fixed');
  document.body.appendChild(this.divRight);
  
  this.divBottom = document.createElement('div');
  this.divBottom.id = 'dimmerDivBottom';
  this.divBottom.setAttribute('style', 'background: #000; opacity: 0.0; z-index: 1999999998; pointer-events: none;; position: absolute');
  document.body.appendChild(this.divBottom);
  
  this.divHeader = document.createElement('div');
  this.divHeader.id = 'dimmerDivHeader';
  this.divHeader.setAttribute('style', 'background: #000; opacity: 0.0; z-index: 2147483647; pointer-events: none; position: fixed');
  document.body.appendChild(this.divHeader);
  
  this.initDivPos();
}

dimmer.initDivPos = function()
{
  this.divBottom.style.top = $('#player-api').offset().bottom + "px";
  
  this.divHeader.style.width = "100%";
  
  this.positionDivs();
}

dimmer.positionDivs = function()
{
  var playerOffset = $('#player-api').offset();
  var headerOffset = $('#masthead-positioner').offset();
  
  this.divTop.style.left = playerOffset.left + "px";
  this.divTop.style.top = headerOffset.top + "px";
  this.divTop.style.height = playerOffset.top + "px";
  this.divTop.style.width = (playerOffset.right - playerOffset.left) + "px";
  
  this.divLeft.style.left = headerOffset.left + "px";
  this.divLeft.style.top = headerOffset.bottom + "px";
  this.divLeft.style.height = (screen.availHeight - headerOffset.bottom) + "px";
  this.divLeft.style.width = playerOffset.left + "px";

  this.divRight.style.left = playerOffset.right + "px";
  this.divRight.style.top = headerOffset.bottom + "px";
  this.divRight.style.height = (screen.availHeight - headerOffset.bottom) + "px";
  this.divRight.style.width = (getDocWidth() - playerOffset.right) + "px";
  
  this.divBottom.style.left = playerOffset.left + "px";
  this.divBottom.style.height = (screen.availHeight - headerOffset.bottom) + "px";
  this.divBottom.style.width = (playerOffset.right - playerOffset.left) + "px";
  
  this.divHeader.style.left = headerOffset.left + "px";
  this.divHeader.style.top = headerOffset.top + "px";
  this.divHeader.style.height = headerOffset.bottom + "px";
  
  if (!this.debugged) {
    console.log("playerOffset = " + playerOffset);
    console.log("playerOffset.left = " + playerOffset.left);
    console.log("playerOffset.right = " + playerOffset.right);
    console.log("playerOffset.top = " + playerOffset.top);
    console.log("playerOffset.bottom = " + playerOffset.bottom);
    
    console.log("headerOffset = " + headerOffset);
    console.log("headerOffset.left = " + headerOffset.left);
    console.log("headerOffset.right = " + headerOffset.right);
    console.log("headerOffset.top = " + headerOffset.top);
    console.log("headerOffset.bottom = " + headerOffset.bottom);
    this.debugged = true;
  }
}

dimmer.onWindowResize = function()
{
  if (this.oldResizeEvent != null) {
    this.oldResizeEvent();
  }
  
  this.positionDivs();
}

dimmer.checkSize = function()
{
  var player = document.getElementById('player');
  if (!hasClass(player, dimmer.oldClass))
  {
    var match = /(watch-small|watch-medium|watch-medium-540|watch-large)/;
    dimmer.oldClass = match.exec(player.className)[0];
    
    dimmer.positionDivs();
  }
  if (dimmer.oldHeight != getDocHeight())
  {
    dimmer.positionDivs();
    dimmer.oldHeight = getDocHeight();
  }
  if (dimmer.oldWidth != getDocWidth())
  {
    dimmer.positionDivs();
    dimmer.oldWidth = getDocHeight();
  }
  
  dimmer.checkOverlays();
}

dimmer.checkOverlays = function()
{
  var frames = document.getElementsByTagName("iframe");
  if (frames.length > dimmer.frameCount) {
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].parentNode.style.zIndex == 2000000000) {
        var divs = frames[i].parentNode.getElementsByTagName('div');
        var hasDiv = false;
        for (var j = 0; j < divs.length; j++) {
          if (divs[j].name == 'dimmerDivPopout') {
            hasDiv = true;
            break;
          }
        }
        if (!hasDiv) {
          var popoutDiv = document.createElement('div');
          popoutDiv.name = 'dimmerDivPopout';
          popoutDiv.setAttribute('style', 'background: #000; opacity:' + (dimmer.opacity/100) + '; z-index: 2147483647; pointer-events: none; position: absolute; top: 0px; width: 100%; border-radius: 3px; -webkit-border-radius: 3px');
          frames[i].parentNode.appendChild((dimmer.divPopouts[dimmer.divPopouts.length] = popoutDiv));
        }
      }
    }
    dimmer.frameCount = frames.length;
  }
  
  var divs = dimmer.divPopouts;
  for (var i = 0; i < divs.length; i++) {
    var div = $(divs[i]);
    div.css('height', div.prev().css('height'));
  }
  
  if (dimmer.isNight && document.activeElement == document.getElementById('masthead-search-term')) {
    dimmer.setState('day');
  }
}

function hasClass(element, className) {
    return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
}

dimmer.checkIsVideo = function()
{
  if (document.location.host.toLowerCase().search(/\byoutube\b/) != -1) {
    if (document.getElementById('player')) {
      return true;
    } else {
      alert("This isn't a video! Please open a video and try again.");
      return false;
    }
  } else {
    return confirm(document.location.host + " is an unknown site. Please use YouTube.com\nDo you wish to continue anyway?");
  }
}

dimmer.setNight = function()
{
  if (this.opacity >= 90)
  {
    this.opacity = 90;
    window.clearInterval(this.nightInterval)
    this.nightInterval = null;
    this.isNight = true;
  } else {
    this.opacity = this.opacity + 2;
  }
  
  this.divTop.style.opacity = this.opacity/100;
  this.divLeft.style.opacity = this.opacity/100;
  this.divRight.style.opacity = this.opacity/100;
  this.divBottom.style.opacity = this.opacity/100;
  this.divHeader.style.opacity = this.opacity/100;
  for (var i = 0; i < this.divPopouts.length; i++) {
    this.divPopouts[i].style.opacity = this.opacity/100;
  }
}

dimmer.setDay = function()
{
  if (this.opacity <= 0)
  {
    this.opacity = 0;
    window.clearInterval(this.dayInterval)
    this.dayInterval = null;
    this.isNight = false;
  } else {
    this.opacity = this.opacity - 2;
  }
  
  this.divTop.style.opacity = this.opacity/100;
  this.divLeft.style.opacity = this.opacity/100;
  this.divRight.style.opacity = this.opacity/100;
  this.divBottom.style.opacity = this.opacity/100;
  this.divHeader.style.opacity = this.opacity/100;
  for (var i = 0; i < this.divPopouts.length; i++) {
    this.divPopouts[i].style.opacity = this.opacity/100;
  }
}

dimmer.setState = function(state)
{
  if (state.toLowerCase() == "day")
  {
    if (this.nightInterval != null) {
      window.clearInterval(this.nightInterval)
      this.nightInterval = null;
    }
    
    if (this.dayInterval == null) {
      this.dayInterval = window.setInterval(function() { dimmer.setDay(); }, 1);
      dimmer.setDay();
    }
    this.dimmerButton.innerHTML = "Dim"
  }
  else if (state.toLowerCase() == "night")
  {
    if (this.dayInterval != null) {
      window.clearInterval(this.dayInterval)
      this.dayInterval = null;
    }
    
    if (this.nightInterval == null) {
      this.nightInterval = window.setInterval(function() { dimmer.setNight(); }, 1);
      dimmer.setNight();
    }
    
    this.dimmerButton.innerHTML = "Brighten"
  }
}

dimmer.toggle = function()
{
  dimmer.setState(dimmer.isNight ? "day" : "night")
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}
function getDocWidth() {
    var D = document;
    return Math.max(
        D.body.scrollWidth, D.documentElement.scrollWidth,
        D.body.offsetWidth, D.documentElement.offsetWidth,
        D.body.clientWidth, D.documentElement.clientWidth
    );
}

function isInstalled() {
  return !(document.getElementById('dimmer') == null);
}
function installReqs() {
  if (document.getElementById('jqueryScript') == null) {
    var jq = document.createElement('script');
    jq.setAttribute('type', 'text/javascript');
    jq.setAttribute('id', 'jqueryScript');
    jq.setAttribute('src', 'http://code.jquery.com/jquery-latest.min.js');
    document.head.appendChild(jq);
  }
}
function checkJqueryInstalled() {
  if (typeof jQuery != 'undefined') {
    dimmer.init();
  } else {
    setTimeout(function() { checkJqueryInstalled(); }, 50);
    console.log("Jquery not found, waiting...");
  }
}

if (!isInstalled()) {
  installReqs();
  setTimeout(function() { checkJqueryInstalled(); }, 50);
}
