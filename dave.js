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
    return this._collection;
  },
 
 /**
  * Returns the face at the desired position
  * @params {number}
  * @return {object} faceObject
  */
  find: function(index) {
    return this._collection[index];
  },
 
 /** @STUB
  * Retruns a random face
  */
  random: function() {
    randomIndex = Math.floor(Math.random() * this.length());
    return this.find(randomIndex);
  },

 /**
  * Returns the length of the collection
  * @return {count} (-1 if not loaded)
  */
  length: function() {
    return this._collection.length || -1
  },

 /**
  * Request/Refreshes faces from the REST server
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
  * @return {undefined}
  */
  _populateDaves: function() {
    if (DAVE.xhr.readyState == 4) {
      DAVE._collection = JSON.parse(this.responseText).faces;

      //trigger the onLoadedCallback
      typeof DAVE._onLoadedCallback === 'function' && DAVE._onLoadedCallback.call(DAVE, DAVE.all());
    }
  },
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
