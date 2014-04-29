window.nightMode = {};

//Functions
nightMode.init = function() {
  alert('Hello!')
  
  this.pageElements = [];
  
  //Format: [Element, [Day background color, Night background color], [Day text color, Night text color]];
  this.pageElements[0] = [document.body, '#f1f1f1', '#0e0e0e'];
  this.pageElements[1] = [document.getElementById('yt-masthead-container'), ['#fff', '#000'];
  this.pageElements[2] = [document.getElementById('search-btn'), ['#fff', '#000'];
  this.pageElements[3] = [document.getElementById('masthead-search-terms'), ['#fff', '#000'], ['#666' '#999']];
  
  
  this.isNight = false;
}

nightMode.setNight = function() {
  for (var i = 0; i < this.pageElements.length; i++) {
    this.pageElements[i][0].style.background = this.pageElements[i][1][1]
    if (this.pageElements[i][2]) {
      this.pageElements[i][0].style.color = this.pageElements[i][2][1]
    }
  }
  alert('Night mode');
  
  this.isNight = true;
}

nightMode.setDay = function() {
  for (var i = 0; i < this.pageElements.length; i++) {
    this.pageElements[i][0].style.background = this.pageElements[i][1][0]
    if (this.pageElements[i][2]) {
      this.pageElements[i][0].style.color = this.pageElements[i][2][0]
    }
  }
  alert('Day mode');
  
  this.isNight = false;
}

nightMode.toggle = function() {
  if (this.isNight) {
    this.setDay();
  } else {
    this.setNight();
  }
}

nightMode.init();

nightMode.toggle();
