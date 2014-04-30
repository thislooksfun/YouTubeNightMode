window.dimmer = {};

//Functions
dimmer.init = function()
{
  if (document.getElementById('dimmer') == null) {
    
    if (!this.isVideo()) {
      alert("This isn't a video! Please open a video and try again.");
      return;
    }
    
    this.dimmerButton = document.createElement('button');
    this.dimmerButton.setAttribute('id', 'dimmer');
    this.dimmerButton.setAttribute('onClick', 'dimmer.toggle()');
    this.dimmerButton.setAttribute('class', 'yt-uix-button yt-uix-button-default yt-uix-button-size-default')
    this.dimmerButton.innerHTML = 'Dim';
    document.getElementById('yt-masthead-content').appendChild(this.dimmerButton);
    
    this.div1 = document.createElement('div');
    this.div1.setAttribute('id', 'dimmerDiv1');
    document.body.appendChild(this.div1);
    
    this.div2 = document.createElement('div');
    this.div2.setAttribute('id', 'dimmerDiv2');
    document.body.appendChild(this.div2);
    
    this.div3 = document.createElement('div');
    this.div3.setAttribute('id', 'dimmerDiv3');
    document.body.appendChild(this.div3);
    
    this.div4 = document.createElement('div');
    this.div4.setAttribute('id', 'dimmerDiv4');
    document.body.appendChild(this.div4);
    
    this.positionDivs();
    
    var rect = document.getElementById('player').getBoundingClientRect();
    alert(rect.top + ', ' + rect.right + ', ' + rect.bottom + ', ' + rect.left);
    
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
}

dimmer.positionDivs = function()
{
  this.div1.style.background = "#000";
  this.div1.style.position = "absolute";
  this.div1.style.zIndex = "2147483647";
  this.div1.style.left = "0px";
  this.div1.style.top = "0px";
  this.div1.style.height = "200px";
  this.div1.style.width = "200px";
  this.div1.style.pointerEvents = "none";
  this.div1.style.opacity = .5;
  
  this.div2.style.background = "#081";
  this.div2.style.position = "absolute";
  this.div2.style.zIndex = "2147483647";
  this.div2.style.left = "0px";
  this.div2.style.top = "200px";
  this.div2.style.height = "200px";
  this.div2.style.width = "200px";
  this.div2.style.pointerEvents = "none";
  this.div2.style.opacity = .5;
  
  this.div3.style.background = "#073";
  this.div3.style.position = "absolute";
  this.div3.style.zIndex = "2147483647";
  this.div3.style.left = "200px";
  this.div3.style.top = "0px";
  this.div3.style.height = "200px";
  this.div3.style.width = "200px";
  this.div3.style.pointerEvents = "none";
  this.div3.style.opacity = .5;
  
  this.div4.style.background = "#625";
  this.div4.style.position = "absolute";
  this.div4.style.zIndex = "2147483647";
  this.div4.style.left = "200px";
  this.div4.style.top = "200px";
  this.div4.style.height = "200px";
  this.div4.style.width = "200px";
  this.div4.style.pointerEvents = "none";
  this.div4.style.opacity = .5;
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