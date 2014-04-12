$(document).ready(function() {
  chrome.storage.local.get('facebook', function(item) {
    if(item.facebook) {
      console.log('DAVE IS HERE');
      facebookExt.init()
    }
  });
});

config = {
  SOURCE: 'http://facesofdave.org/',
};

facebookExt = {
  Daves: [],

  init: function() {
    DAVE.requestDaves(config.SOURCE, this.onLoad);
  },

  onLoad: function(daves) {
    setInterval(facebookExt.injectDaves, 200)
  },

  injectDaves: function() {
    $target = $('.faceBox:not(.daved, .faceBoxHidden), .tagBox:not(.daved)').show();
    $target.each(function(index,ele) {
      var $img = $('<img>').attr('src', DAVE.random().image);

      $img.css({'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'width': $(ele).width(),
                'z-index': $(ele).width()+1000});

      $(ele).addClass('daved').append($img);
    });
  },
};
