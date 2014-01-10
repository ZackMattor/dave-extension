/*********
 * DAVE is our object that handles interaction with the actual faces. :)
 */
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
 
 /**
  * Retruns a random face
  * @return {object} faceObject
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
  * @param {Function} callback(daves): called after model loaded 
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
  * @calls {_onLoadedCallback}(daves)
  */
  _populateDaves: function() {
    if (DAVE.xhr.readyState == 4) {
      DAVE._collection = JSON.parse(this.responseText).faces;

      //trigger the onLoadedCallback
      typeof DAVE._onLoadedCallback === 'function' && DAVE._onLoadedCallback.call(DAVE, DAVE.all());
    }
  },
};
