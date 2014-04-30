window.dimmer = {};

//Functions
dimmer.init = function()
{
  if (!this.initalized) {
    this.pageElements = [];
    var eleNum = 0; //Element number
    
    //Format: {'element': Element, 'background': {'day': Day background color, 'night': Night background color], 'text': {'day': Day text color, 'night': Night text color}};
    this.pageElements[eleNum++] = {'element': document.body,                                    'background': {'day': '#f1f1f1', 'night': '#0e0e0e'}};
    this.pageElements[eleNum++] = {'element': document.getElementById('yt-masthead-container'), 'background': {'day': '#fff',    'night': '#000'}};
    this.pageElements[eleNum++] = {'element': document.getElementById('search-btn'),            'background': {'day': '#fff',    'night': '#000'}};
    this.pageElements[eleNum++] = {'element': document.getElementById('masthead-search-terms'), 'background': {'day': '#fff',    'night': '#000'}};
    this.pageElements[eleNum++] = {'element': document.getElementById('appbar-guide-button'),   'background': {'day': '', 'night': '#070707'}};
    this.pageElements[eleNum++] = {'element': document.getElementById('masthead-search-term'),  'text': {'day': '#000', 'night': '#fff'}};
    
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
