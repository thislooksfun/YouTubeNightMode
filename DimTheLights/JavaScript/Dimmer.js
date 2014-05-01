window.dimmer = {};

//Functions
dimmer.init = function()
{
  if (document.getElementById('dimmer') == null) {
    
    alert(getDocHeight() + ", " + getDocWidth());
    
    if (!this.isVideo()) {
      alert("This isn't a video! Please open a video and try again.");
      return;
    }
    
    var container = document.getElementById('yt-masthead-user');
    this.dimmerButton = document.createElement('button');
    this.dimmerButton.setAttribute('id', 'dimmer');
    this.dimmerButton.setAttribute('onClick', 'dimmer.toggle()');
    this.dimmerButton.className = 'yt-uix-button yt-uix-button-default yt-uix-button-size-default tlf-button ' + ((container.firstChild.className.search(/\btlf-button\b/) == -1) ? "tlf-button-first" : "");
    this.dimmerButton.setAttribute('style', 'position: relative; right: ' + ((container.firstChild.className.search(/\btlf-button\b/) == -1) ? "5px" : "3px"));
    this.dimmerButton.innerHTML = 'Dim';
    container.insertBefore(this.dimmerButton, container.firstChild);
    
    this.initDivs();
    
    this.isNight = false;
    
    this.checkSize();
    window.setInterval(this.checkSize, 40);
    if (window.onresize != null) {
      this.oldResizeEvent = window.onresize;
      window.onresize = dimmer.onWindowResize;
    }
  } else {
    this.dimmerButton = document.getElementById('dimmer');
  }
}

dimmer.initDivs = function()
{
  this.div1 = document.createElement('div');
  this.div1.setAttribute('id', 'dimmerDiv1');
  this.div1.setAttribute('style', 'background: #000; z-index: 1999999998; pointer-events: none; opacity: 0.5; position: absolute');
  document.body.appendChild(this.div1);
  
  this.div2 = document.createElement('div');
  this.div2.setAttribute('id', 'dimmerDiv2');
  this.div2.setAttribute('style', 'background: #000; z-index: 1999999998; pointer-events: none; opacity: 0.5; position: absolute');
  document.body.appendChild(this.div2);
  
  this.div3 = document.createElement('div');
  this.div3.setAttribute('id', 'dimmerDiv3');
  this.div3.setAttribute('style', 'background: #000; z-index: 1999999998; pointer-events: none; opacity: 0.5; position: absolute');
  document.body.appendChild(this.div3);
  
  this.div4 = document.createElement('div');
  this.div4.setAttribute('id', 'dimmerDiv4');
  this.div4.setAttribute('style', 'background: #000; z-index: 1999999998; pointer-events: none; opacity: 0.5; position: absolute');
  document.body.appendChild(this.div4);
  
  this.divHeader = document.createElement('div');
  this.divHeader.setAttribute('id', 'dimmerDivHeader');
  this.divHeader.setAttribute('style', 'background: #000; z-index: 2147483647; pointer-events: none; opacity: 0.5; position: fixed;');
  document.body.appendChild(this.divHeader);
  
  this.positionDivs();
}

dimmer.positionDivs = function()
{
  var playerRect = document.getElementById('player-api').getBoundingClientRect();
  var headerRect = document.getElementById('masthead-positioner').getBoundingClientRect();
  
  this.div1.style.left = "0px";
  this.div1.style.top = "0px";
  this.div1.style.height = playerRect.top + "px";
  this.div1.style.width = getDocWidth() + "px";
  
  this.div2.style.left = "0px";
  this.div2.style.top = playerRect.top + "px";
  this.div2.style.height = (playerRect.bottom - playerRect.top) + "px";
  this.div2.style.width = playerRect.left + "px";

  this.div3.style.left = playerRect.right + "px";
  this.div3.style.top = playerRect.top + "px";
  this.div3.style.height = (playerRect.bottom - playerRect.top) + "px";
  this.div3.style.width = (getDocWidth() - playerRect.right) + "px";
  
  this.div4.style.left = "0px";
  this.div4.style.top = playerRect.bottom + "px";
  this.div4.style.height = (getDocHeight() - playerRect.bottom) + "px";
  this.div4.style.width = getDocWidth() + "px";
  
  this.divHeader.style.left = "0px";
  this.divHeader.style.top = "0px";
  this.divHeader.style.width = getDocWidth();
  this.divHeader.style.height = headerRect.bottom;
  
  alert(this.divHeader.style.width + ", " + this.divHeader.style.height + "\n" + getDocWidth() + ", " + headerRect.bottom);
}

dimmer.onWindowResize = function()
{
  if (this.oldResizeEvent != null) {
    this.oldResizeEvent();
  }
}

dimmer.checkSize = function()
{
  var player = document.getElementById('player');
  if (!hasClass(player, this.oldClass))
  {
    var match = /(watch-small|watch-medium|watch-medium-540|watch-large)/;
    this.oldClass = match.exec(player.className)[0];
    
    dimmer.positionDivs();
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
    this.div1.style.opacity = this.opacity/100;
    this.div2.style.opacity = this.opacity/100;
    this.div3.style.opacity = this.opacity/100;
    this.div4.style.opacity = this.opacity/100;
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
    this.div1.style.opacity = this.opacity/100;
    this.div2.style.opacity = this.opacity/100;
    this.div3.style.opacity = this.opacity/100;
    this.div4.style.opacity = this.opacity/100;
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
