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
  document.body.style.background = '#0e0e0e'
  alert('Night mode');
}

nightMode.toggleDay = function() {
  document.body.style.background = '#f1f1f1'
  alert('Day mode');
}

nightMode.init();

nightMode.toggleNight();
