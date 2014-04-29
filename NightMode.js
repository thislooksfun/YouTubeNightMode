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
  this.pageElements[eleNum++] = {'element': document.getElementById('appbar-guide-button'),   'background': {'day': '#f8f8f8', 'night': '#070707'}};
  
  
  var nightButton = document.createElement('button');
  nightButton.setAttribute('id', 'nightButton');
  nightButton.setAttribute('onClick', 'nightMode.toggle()');
  nightButton.setAttribute('class', 'yt-uix-button yt-uix-button-default yt-uix-button-size-default')
  nightButton.innerHTML = 'Night Mode';
  document.getElementById('yt-masthead-content').appendChild(nightButton);
  
  this.isNight = false;
  this.initalized = true;
}

nightMode.setNight = function()
{
  for (var i = 0; i < this.pageElements.length; i++) {
    this.pageElements[i].element.style.background = this.pageElements[i].background.night
    if (this.pageElements[i].text) {
      this.pageElements[i].element.style.color = this.pageElements[i].text.night
    }
  }
  alert('Night mode');
  
  this.isNight = true;
}

nightMode.setDay = function()
{
  for (var i = 0; i < this.pageElements.length; i++) {
    this.pageElements[i].element.style.background = this.pageElements[i].background.day
    if (this.pageElements[i].text) {
      this.pageElements[i].element.style.color = this.pageElements[i].text.day
    }
  }
  alert('Day mode');
  
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
nightMode.init();
