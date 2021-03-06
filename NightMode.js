window.nightMode = {};

//Functions
nightMode.init = function()
{
  if (document.getElementById('nightButton') == null) {
    this.pageElements = [];
    var eleNum = 0; //Element number
    
    //Format: {'element': Element, 'background': {'day': Day background color, 'night': Night background color], 'text': {'day': Day text color, 'night': Night text color}};
    this.pageElements[eleNum++] = {'element': document.body,                                    'background': {'day': '#f1f1f1', 'night': '#0e0e0e'}};
    this.pageElements[eleNum++] = {'element': document.getElementById('yt-masthead-container'), 'background': {'day': '#fff',    'night': '#000'}};
    this.pageElements[eleNum++] = {'element': document.getElementById('search-btn'),            'background': {'day': '#fff',    'night': '#000'}};
    this.pageElements[eleNum++] = {'element': document.getElementById('masthead-search-terms'), 'background': {'day': '#fff',    'night': '#000'}};
    this.pageElements[eleNum++] = {'element': document.getElementById('appbar-guide-button'),   'background': {'day': '', 'night': '#070707'}};
    this.pageElements[eleNum++] = {'element': document.getElementById('masthead-search-term'),  'text': {'day': '#000', 'night': '#fff'}};
    
    var container = document.getElementById('tlf-button-container');
    if (container == null) {
      container = document.createElement('span');
      container.id = 'tlf-button-container';
      container.className = 'yt-uix-button-group';
      container.setAttribute('style', 'position: relative; right: 5px');
      var headUser = document.getElementById('yt-masthead-user');
      headUser.insertBefore(container, headUser.firstChild);
    }
    this.nightButton = document.createElement('button');
    this.nightButton.setAttribute('id', 'nightButton');
    this.nightButton.onclick = function() { nightMode.toggle(); };
    this.nightButton.className = 'yt-uix-button yt-uix-button-default yt-uix-button-size-default';
    this.nightButton.innerHTML = 'Night Mode';
    container.appendChild(this.nightButton);
    
    this.isNight = false;
  } else {
    this.nightButton = document.getElementById('nightButton');
  }
}

nightMode.setNight = function()
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
  
  this.nightButton.innerHTML = "Day mode"
  
  this.isNight = true;
}

nightMode.setDay = function()
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
  
  this.nightButton.innerHTML = "Night mode"
  
  this.isNight = false;
}

nightMode.toggle = function()
{
  if (this.isNight) {
    this.setDay();
  } else {
    this.setNight();
  }
}

nightMode.init();
