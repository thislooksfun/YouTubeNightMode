window.dimmer = {};

//Functions
dimmer.init = function()
{
  if (document.getElementById('dimmer') == null) {
    
    if (!this.isVideo()) {
      alert("This isn't a video! Please open a video and try again.");
      return;
    }
    
    var css = document.createElement('link');
    css.setAttribute('type', 'text/css');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', 'https://raw.githubusercontent.com/thislooksfun/YouTubeNightMode/master/DimTheLights/CSS/dimmer.css');
    document.head.appendChild(css);
    
    css = document.createElement('link');
    css.setAttribute('type', 'text/css');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', 'https://raw.githubusercontent.com/thislooksfun/YouTubeNightMode/master/CSS/buttons.css');
    document.head.appendChild(css);
    
    var container = document.getElementById('yt-masthead-user');
    this.dimmerButton = document.createElement('button');
    this.dimmerButton.setAttribute('id', 'dimmer');
    this.dimmerButton.setAttribute('onClick', 'dimmer.toggle()');
    this.dimmerButton.className = 'yt-uix-button yt-uix-button-default yt-uix-button-size-default tlf-button' + ((container.firstChild.className.search(/\btlf-button\b/) == -1) ? "-first" : "");
    this.dimmerButton.innerHTML = 'Dim';
    container.insertBefore(this.dimmerButton, container.firstChild);
    
    this.div1 = document.createElement('div');
    this.div1.setAttribute('id', 'dimmerDiv1');
    this.div1.setAttribute('class', 'tlf-dimmer-overlay');
    document.body.appendChild(this.div1);
    
    this.div2 = document.createElement('div');
    this.div2.setAttribute('id', 'dimmerDiv2');
    this.div2.setAttribute('class', 'tlf-dimmer-overlay');
    document.body.appendChild(this.div2);
    
    this.div3 = document.createElement('div');
    this.div3.setAttribute('id', 'dimmerDiv3');
    this.div3.setAttribute('class', 'tlf-dimmer-overlay');
    document.body.appendChild(this.div3);
    
    this.div4 = document.createElement('div');
    this.div4.setAttribute('id', 'dimmerDiv4');
    this.div4.setAttribute('class', 'tlf-dimmer-overlay');
    document.body.appendChild(this.div4);
    
    this.positionDivs();
    
    this.isNight = false;
    this.initalized = true;
    
    this.checkSize();
    window.setInterval(this.checkSize, 40);
    if (window.onresize != null) {
      this.oldResizeEvent = window.onresize;
      window.onresize = dimmer.onWindowResize;
    }
  } else {
    this.dimmerButton = document.getElementById('dimmer');
  }
  
  setTimeout(this.refreshElements, 20)
}

dimmer.refreshElements = function()
{
  this.dimmerButton.hide().show();
  
  this.div1.hide().show();
  this.div2.hide().show();
  this.div3.hide().show();
  this.div4.hide().show();
}

dimmer.positionDivs = function()
{
  var rect = document.getElementById('player').getBoundingClientRect();
  
  this.div1.style.left = "0px";
  this.div1.style.top = "0px";
  this.div1.style.height = rect.top + "px";
  this.div1.style.width = window.availWidth + "px";
  
  this.div2.style.left = "0px";
  this.div2.style.top = rect.top + "px";
  this.div2.style.height = (rect.bottom - rect.top) + "px";
  this.div2.style.width = rect.left + "px";

  this.div3.style.left = rect.right + "px";
  this.div3.style.top = rect.top + "px";
  this.div3.style.height = (rect.bottom - rect.top) + "px";
  this.div3.style.width = (screen.availWidth - rect.right) + "px";
  
  this.div4.style.left = "0px";
  this.div4.style.top = rect.bottom + "px";
  this.div4.style.height = (window.availHeight - rect.bottom) + "px";
  this.div4.style.width = window.availWidth + "px";
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


dimmer.init();
