$(document).ready(function() {
  console.log('DAVE IS HERE');

  daveExt.init();
});

config = {
  SOURCE: 'http://facesofdave.org/' 
}

DAVE = {
  
  //Our "public" xhr XMLHttpRequest
  xhr: null,
  
  //Collection of daves
  _collection: null,

  _onLoadedCallback: null,

 /**
  * Returns all faces from the DAVE
  * @return {array}
  */
  all: function() {
    if(typeof _collection === 'undefined') {
      this.requestDaves(config.SOURCE);
    }

    return this._collection || [];
  },

 /**
 * Retruns a random face

 /**
  * Request/Refreshes faces from the REST server
  * @param {number} b
  * @param (function) callback
  * @return {undefined}
  */
  requestDaves: function(domain, callback) {
    var xhr = this.xhr = this.xhr || new XMLHttpRequest();

    this._onLoadedCallback = callback;

    xhr.open("GET", domain + "faces.json", true);
    xhr.onreadystatechange = this._populateDaves;
    xhr.send();

  },

 /**
  * CALLBACK to the xhr request on ready state change
  * @param {number} b
  * @return {undefined}
  */
  _populateDaves: function() {
    if (DAVE.xhr.readyState == 4) {
      DAVE._collection=JSON.parse(this.responseText).faces;

      //trigger the onLoadedCallback
      typeof DAVE._onLoadedCallback === 'function' && DAVE._onLoadedCallback(DAVE.all());
    }
  },


}

daveExt = {
  Daves: [],

  init: function() {
    DAVE.requestDaves(config.SOURCE, this.onLoad);
  },

  onLoad: function(daves) {
    debugger
    //REMOVED: setInterval for scanning facebook... need to re-add that
  },

 /**
  * Request faces from the REST server
  * @param {number} b
  * @return {undefined}
  */
  requestDaves: function() {
    this.xhr = new XMLHttpRequest();
    this.xhr.open("GET", config.SOURCE + "faces.json", true);
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
      var $img = $('<img>').attr('src', 'http://facesofdave.org/' + daveExt.Daves[Math.floor((Math.random()*daveExt.Daves.length))].image);

      $img.css({'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'width': $(ele).width(),
                'z-index': $(ele).width()+1000});

      $(ele).addClass('daved').append($img);
    });
  },
}

