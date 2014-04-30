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
    document.body.appendChild(this.div1);
    this.div2 = document.createElement('div');
    document.body.appendChild(this.div2);
    this.div3 = document.createElement('div');
    document.body.appendChild(this.div3);
    this.div4 = document.createElement('div');
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
  //this.div1.style.height = ??;
  
  //this.div2.style.width = ??;
  //this.div2.style.height = ??;
  
  //this.div3.style.xPos = ??;
  //this.div3.style.width = ??;
  //this.div3.style.height = ??;
  
  //this.div4.style.height = ??;
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
    
    this.positionDivs();
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
  for (var i = 0; i < this.pageElements.length; i++) {
    var elementData = this.pageElements[i];
    
    if (elementData.background) {
      elementData.element.style.background = elementData.background.night;
    }
    if (elementData.text) {
      elementData.element.style.color = elementData.text.night;
    }
    if (elementData.opacity) {
      elementData.element.style.opacity = elementData.opacity;
    }
  }
  
  this.dimmerButton.innerHTML = "Brighten"
  
  this.isNight = true;
}

dimmer.setDay = function()
{
  for (var i = 0; i < this.pageElements.length; i++) {
    var elementData = this.pageElements[i];
    
    if (elementData.background) {
      elementData.element.style.background = elementData.background.day
    }
    if (elementData.text) {
      elementData.element.style.color = elementData.text.day
    }
    if (elementData.opacity) {
      elementData.element.style.opacity = elementData.opacity;
    }
  }
  
  this.dimmerButton.innerHTML = "Dim"
  
  this.isNight = false;
}

dimmer.toggle = function()
{
  if (!dimmer.initalized) {
    dimmer.init();
  }
  
  if (this.isNight) {
    this.setDay();
  } else {
    this.setNight();
  }
}


//Startup Code
if (!dimmer.initalized) {
  dimmer.init();
}
