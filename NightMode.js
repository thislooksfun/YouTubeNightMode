window.nightMode = {};

//Functions
nightMode.init = function() {
  alert('Hello!')
  
  this.pageElements = [];
  
  //Format: [Element, Day color, Night color]
  this.pageElements[0] = [document.body, '#f1f1f1', '#0e0e0e'];
  this.pageElements[1] = [document.getElementById('yt-masthead-container'), '#fff', '#000'];
  this.pageElements[1] = [document.getElementById('yt-uix-button-content'), '#fff', '#000'];
}

nightMode.toggleNight = function() {
  for (var i = 0; i < this.pageElements.length; i++) {
    this.pageElements[i][0].style.background = this.pageElements[i][2]
  }
  alert('Night mode');
}

nightMode.toggleDay = function() {
  for (var i = 0; i < this.pageElements.length; i++) {
    this.pageElements[i][0].style.background = this.pageElements[i][1]
  }
  alert('Day mode');
}

nightMode.init();

nightMode.toggleNight();
