window.dimmer = {};

//Functions
dimmer.init = function()
{
  if (document.getElementById('dimmer') == null) {
    
    if (!this.isVideo()) {
      alert("This isn't a video! Please open a video and try again.");
      return;
    }
    
    var container = document.getElementById('yt-masthead-user');
    this.dimmerButton = document.createElement('button');
    this.dimmerButton.id = 'dimmer';
    this.dimmerButton.onclick = dimmer.toggle;
    this.dimmerButton.className = 'yt-uix-button yt-uix-button-default yt-uix-button-size-default tlf-button';
    this.dimmerButton.innerHTML = 'Dim';
    this.dimmerButton.setAttribute('style', 'position: relative; right: ' + ((container.firstChild.className.search(/\btlf-button\b/) == -1) ? "5px" : "3px"));
    container.insertBefore(this.dimmerButton, container.firstChild);
    
    this.divPopouts = {};
    
    this.initDivs();
    
    this.checkSize();
    window.setInterval(this.checkSize, 40);
    if (window.onresize != null) {
      this.oldResizeEvent = window.onresize;
      window.onresize = dimmer.onWindowResize;
    }
  } else {
    this.dimmerButton = document.getElementById('dimmer');
    this.divTop = document.getElementById('dimmerDivTop');
    this.divLeft = document.getElementById('dimmerDivLeft');
    this.divRight = document.getElementById('dimmerDivRight');
    this.divBottom = document.getElementById('dimmerDivBottom');
    this.divHeader = document.getElementById('dimmerDivHeader');
    this.divPopouts = document.getElementsByName('dimmerDivPopout');
  }
  
  this.uploader = (document.getElementsByClassName("yt-user-name")[0]).innerHTML;
  this.frameCount = 0;
  
  function fixDiv() {
    var $cache = $('#dimmerDivBottom');
    var top = 50;
    if ($(window).scrollTop() > (dimmer.topPos - top)) {
      $cache.css({'position': 'fixed', 'top': top + 'px'});
    } else {
      $cache.css({'position': 'absolute', 'top': dimmer.topPos + 'px'});
    }
  };
  $(window).scroll(fixDiv);
  
  this.topPos = $('#dimmerDivBottom').offset().top;
}

dimmer.initDivs = function()
{
  this.divTop = document.createElement('div');
  this.divTop.id = 'dimmerDivTop';
  this.divTop.setAttribute('style', 'background: #000; opacity: 0.8; z-index: 1999999998; pointer-events: none; position: absolute');
  document.body.appendChild(this.divTop);
  
  this.divLeft = document.createElement('div');
  this.divLeft.id = 'dimmerDivLeft';
  this.divLeft.setAttribute('style', 'background: #000; opacity: 0.8; z-index: 2147483647; pointer-events: none; position: fixed');
  document.body.appendChild(this.divLeft);
  
  this.divRight = document.createElement('div');
  this.divRight.id = 'dimmerDivRight';
  this.divRight.setAttribute('style', 'background: #000; opacity: 0.8; z-index: 2147483647; pointer-events: none; position: fixed');
  document.body.appendChild(this.divRight);
  
  this.divBottom = document.createElement('div');
  this.divBottom.id = 'dimmerDivBottom';
  this.divBottom.setAttribute('style', 'background: #000; opacity: 0.8; z-index: 1999999998; pointer-events: none;; position: absolute');
  document.body.appendChild(this.divBottom);
  
  this.divHeader = document.createElement('div');
  this.divHeader.id = 'dimmerDivHeader';
  this.divHeader.setAttribute('style', 'background: #000; opacity: 0.8; z-index: 2147483647; pointer-events: none; position: fixed;');
  document.body.appendChild(this.divHeader);
  
  this.positionDivs();
}

dimmer.positionDivs = function()
{
  var playerRect = document.getElementById('player-api').getBoundingClientRect();
  var headerRect = document.getElementById('masthead-positioner').getBoundingClientRect();
  
  this.divTop.style.left = playerRect.left + "px";
  this.divTop.style.top = "0px";
  this.divTop.style.height = playerRect.top + "px";
  this.divTop.style.width = (playerRect.right - playerRect.left) + "px";
  
  this.divLeft.style.left = "0px";
  this.divLeft.style.top = headerRect.bottom + "px";
  this.divLeft.style.height = (screen.availWidth - headerRect.bottom) + "px";
  this.divLeft.style.width = playerRect.left + "px";

  this.divRight.style.left = playerRect.right + "px";
  this.divRight.style.top = headerRect.bottom + "px";
  this.divRight.style.height = (screen.availWidth - headerRect.bottom) + "px";
  this.divRight.style.width = (getDocWidth() - playerRect.right) + "px";
  
  this.divBottom.style.left = playerRect.left + "px";
  this.divBottom.style.top = playerRect.bottom + "px";
  this.divBottom.style.height = (screen.availWidth - headerRect.bottom) + "px";
  this.divBottom.style.width = (playerRect.right - playerRect.left) + "px";
  
  this.divHeader.style.left = "0px";
  this.divHeader.style.top = "0px";
  this.divHeader.style.height = headerRect.bottom + "px";
  this.divHeader.style.width = "100%";
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
          popoutDiv.setAttribute('style', 'background: #000; opacity: 0.8; z-index: 2147483647; pointer-events: none; position: absolute; top: 0px; width: 100%; border-radius: 3px; -webkit-border-radius: 3px');
          frames[i].parentNode.appendChild((dimmer.divPopouts[dimmer.divPopouts.length] = popoutDiv));
          console.log("Length is :" + dimmer.divPopouts.length);
        }
      }
    }
    dimmer.frameCount = frames.length;
  }
  
  var divs = dimmer.divPopouts;
  for (var i = 0; i < divs.length; i++) {
    var div = $(divs[i]);
    div.css('height', div.prev().css('height'));
    console.log(i + ", " + div.css('height') + ", " + div.prev().css('height'));
  }
}

function hasClass(element, className) {
    return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
}

dimmer.isVideo = function()
{
  if (document.getElementById('player')) {
    return true;
  } else {
    return false;
  }
}

dimmer.setNight = function()
{
  if (this.opacity < 80)
  {
    this.opacity = this.opacity + 1;
    this.divTop.style.opacity = this.opacity/100;
    this.divLeft.style.opacity = this.opacity/100;
    this.divRight.style.opacity = this.opacity/100;
    this.divBottom.style.opacity = this.opacity/100;
    for (var i = 0; i < this.divPopouts.length; i++) {
      this.divPopouts[i].style.opacity = this.opacity/100;
    }
  } else {
    window.clearInterval(this.nightInterval)
    this.nightInterval = null;
    this.isNight = true;
  }
}

dimmer.setDay = function()
{
  if (this.opacity > 0)
  {
    this.opacity = this.opacity - 1;
    this.divTop.style.opacity = this.opacity/100;
    this.divLeft.style.opacity = this.opacity/100;
    this.divRight.style.opacity = this.opacity/100;
    this.divBottom.style.opacity = this.opacity/100;
    for (var i = 0; i < this.divPopouts.length; i++) {
      this.divPopouts[i].style.opacity = this.opacity/100;
    }
  } else {
    window.clearInterval(this.dayInterval)
    this.dayInterval = null;
    this.isNight = false;
  }
}

dimmer.toggle = function()
{
  alert('This hasn\'t been implemented yet!');
  return;
  
  if (this.isNight)
  {
    if (this.nightInterval != null) {
      window.clearInterval(this.nightInterval)
      this.nightInterval = null;
    }
    
    if (this.dayInterval == null) {
      this.dayInterval = window.setInterval(dimmer.setDay, 100);
      dimmer.setDay();
    }
    
    this.dimmer.innerHTML = "Brighten"
  }
  else
  {
    if (this.dayInterval != null) {
      window.clearInterval(this.dayInterval)
      this.dayInterval = null;
    }
    
    if (this.nightInterval == null) {
      this.nightInterval = window.setInterval(dimmer.setNight, 100);
      dimmer.setNight();
    }
    
    this.dimmer.innerHTML = "Dim"
  }
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

dimmer.init();
