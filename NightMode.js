window.nightMode = {};

//Functions
nightMode.init = function() {
  alert('Hello!')
  
  this.pageElements = [];
  this.pageElements[0] = document.getElementById('yt-masthead-container');
  
  alert('Color = ' + this.pageElements[0].style.color +'\nBackground = ' + this.pageElements[0].style.background);
  alert('Background = ' + document.body.style.background);
}

nightMode.toggleNight = function() {
  
}

nightMode.toggleDay = function() {
  
}

nightMode.init();
