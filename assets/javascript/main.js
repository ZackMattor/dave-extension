$(document).ready(function() {
  console.log('DAVE IS HERE');

  daveExt.init();
});

config = {
  SOURCE: 'http://facesofdave.org/',
};

daveExt = {
  Daves: [],

  init: function() {
    DAVE.requestDaves(config.SOURCE, this.onLoad);
  },

  onLoad: function(daves) {
    setInterval(daveExt.injectDaves, 200)
  },

  injectDaves: function() {
    $target = $('.faceBox:not(.daved, .faceBoxHidden)').show();
    $target.each(function(index,ele) {
      var $img = $('<img>').attr('src', 'http://facesofdave.org/' + DAVE.random().image);

      $img.css({'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'width': $(ele).width(),
                'z-index': $(ele).width()+1000});

      $(ele).addClass('daved').append($img);
    });
  },
};
