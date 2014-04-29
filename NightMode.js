window.nightMode = {};

//Functions
nightMode.init = function()
{
  this.pageElements = [];
  
  //Format: ['element': Element, 'background': ['day': Day background color, 'night': Night background color], 'text': ['day': Day text color, 'night': Night text color]];
  this.pageElements[0] = {'element': document.body,                                    'background': {'day': '#f1f1f1', 'night': '#0e0e0e'}};
  this.pageElements[1] = {'element': document.getElementById('yt-masthead-container'), 'background': {'day': '#fff',    'night': '#000'}};
  this.pageElements[2] = {'element': document.getElementById('search-btn'),            'background': {'day': '#fff',    'night': '#000'}};
  this.pageElements[3] = {'element': document.getElementById('masthead-search-terms'), 'background': {'day': '#fff',    'night': '#000'}, 'text': {'day': '#666', 'night': '#999'}};
  
  
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
if (!nightMode.initalized) {
  nightMode.init();
}

nightMode.toggle();
