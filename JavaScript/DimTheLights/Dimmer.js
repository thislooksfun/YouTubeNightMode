window.dimmer = {};

//Functions
dimmer.init = function()
{
  if (!this.initalized) {
    
    if (!this.isVideo()) {
      alert("This isn't a video! Please open a video and try again.");
      return;
    }
    
    if (document.getElementById('dimmer') == null) {
      this.dimmerButton = document.createElement('button');
      this.dimmerButton.setAttribute('id', 'dimmer');
      this.dimmerButton.setAttribute('onClick', 'dimmer.toggle()');
      this.dimmerButton.setAttribute('class', 'yt-uix-button yt-uix-button-default yt-uix-button-size-default')
      this.dimmerButton.innerHTML = 'Dim';
      document.getElementById('yt-masthead-content').appendChild(this.dimmerButton);
    } else {
      this.dimmerButton = document.getElementById('dimmer');
    }
    
    this.isNight = false;
    this.initalized = true;
    
    this.checkSize();
  }
}

dimmer.checkSize = function()
{
  var player = document.getElementById('player', this.oldClass);
  if (!hasClass(player))
  {
    var match = /(watch-small|watch-medium|watch-medium-540|watch-large)/;
    this.oldClass = match.exec(player.className)[0];
    alert(this.oldClass);
  } else {
    alert(player.className);
  }
  
  window.setTimeout(this.checkSize, 5000);
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
