window.nightMode = {};

//Functions
nightMode.init = function()
{
  this.pageElements = [];
  var eleNum = 0; //Element number
  
  //Format: {'element': Element, 'background': {'day': Day background color, 'night': Night background color], 'text': {'day': Day text color, 'night': Night text color}};
  this.pageElements[eleNum++] = {'element': document.body,                                    'background': {'day': '#f1f1f1', 'night': '#0e0e0e'}};
  this.pageElements[eleNum++] = {'element': document.getElementById('yt-masthead-container'), 'background': {'day': '#fff',    'night': '#000'}};
  this.pageElements[eleNum++] = {'element': document.getElementById('search-btn'),            'background': {'day': '#fff',    'night': '#000'}};
  this.pageElements[eleNum++] = {'element': document.getElementById('masthead-search-terms'), 'background': {'day': '#fff',    'night': '#000'}, 'text': {'day': '#666', 'night': '#999'}};
  this.pageElements[eleNum++] = {'element': document.getElementById('appbar-guide-button'),   'background': {'day': '#f8f8f8', 'night': '#070707'}, 'opacity': 0};
  
  if (!this.nightButton) {
    this.nightButton = document.createElement('button');
    this.nightButton.setAttribute('id', 'nightButton');
    this.nightButton.setAttribute('onClick', 'nightMode.toggle()');
    this.nightButton.setAttribute('class', 'yt-uix-button yt-uix-button-default yt-uix-button-size-default')
    this.nightButton.innerHTML = 'Night Mode';
    document.getElementById('yt-masthead-content').appendChild(this.nightButton);
    
    var cssNight = document.createElement('link');
    cssNight.setAttribute('type', 'text/css');
    cssNight.setAttribute('rel', 'stylesheet');
    cssNight.setAttribute('href', 'https://raw.githubusercontent.com/thislooksfun/YouTubeNightMode/master/css/mainNight.css')
    document.getElementById('yt-masthead-content').appendChild(cssNight);
  }
  
  this.isNight = false;
  this.initalized = true;
}

nightMode.setNight = function()
{
  for (var i = 0; i < this.pageElements.length; i++) {
    var elementData = this.pageElements[i];
    
    elementData.element.style.background = elementData.background.night;
    
    if (elementData.text) {
      elementData.element.style.color = elementData.text.night;
    }
    if (elementData.opacity) {
      elementData.element.style.opacity = elementData.opacity;
    }
  }
  
  this.nightButton.innerHTML = "Day mode"
  
  this.isNight = true;
}

nightMode.setDay = function()
{
  for (var i = 0; i < this.pageElements.length; i++) {
    var elementData = this.pageElements[i];
    
    elementData.element.style.background = elementData.background.day
    if (elementData.text) {
      elementData.element.style.color = elementData.text.day
    }
    if (elementData.opacity) {
      elementData.element.style.opacity = elementData.opacity;
    }
  }
  
  this.nightButton.innerHTML = "Night mode"
  
  this.isNight = false;
}

nightMode.toggle = function()
{
  if (!nightMode.initalized) {
    nightMode.init();
  }
  
  if (this.isNight) {
    this.setDay();
  } else {
    this.setNight();
  }
}


//Startup Code
if (!nightMode.initalized) {
  nightMode.init();
}
