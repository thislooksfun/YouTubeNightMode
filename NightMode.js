window.nightMode = {};

//Functions
nightMode.init = function() {
  alert('Hello!')
  
  this.pageElements = [];
  this.pageElements[0] = document.getElementById('yt-masthead-container');
  
  alert('Color = ' + this.pageElements[0].style.color);
}

nightMode.toggleNight = function() {
  
}

nightMode.toggleDay = function() {
  
}

nightMode.init();
