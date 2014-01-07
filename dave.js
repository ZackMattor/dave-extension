$(document).ready(function() {
  console.log('DAVE IS HERE');

  daveExt.init();
});

daveExt = {
  Daves: [],
  xhr: null,

  init: function() {
    this.requestDaves();
  },

  requestDaves: function() {
    this.xhr = new XMLHttpRequest();
    this.xhr.open("GET", "http://localhost:3000/faces.json", true);
    this.xhr.onreadystatechange = this.populateDaves;
    this.xhr.send();
  },

  populateDaves: function() {
    if (daveExt.xhr.readyState == 4) {
      console.log('faces found');
      daveExt.Daves=JSON.parse(this.responseText).faces;
      setInterval(daveExt.injectDaves, 200);
    }
  },

  injectDaves: function() {
    $target = $('.faceBox:not(.daved, .faceBoxHidden)').show();
    $target.each(function(index,ele) {
      var $img = $('<img>').attr('src', 'http://localhost:3000/' + daveExt.Daves[1].image);

      $img.css({'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'width': $(ele).width(),
                'z-index': $(ele).width()+1000});

      $target.addClass('daved').append($img);
    });
  },
}
