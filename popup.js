// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var kittenGenerator = {
  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestKittens: function() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://facesofdave.org/faces.json", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        faces=JSON.parse(this.responseText).faces

        for (var i = 0; i < faces.length; i++) {
          var $img = $('<img>');
          $img.attr('src', "http://facesofdave.org/" + faces[i].image);
          $('body').append($img);
        }
      }
    }
    xhr.send();
  },
};

var appOptions = {
  _options: {
    facebook: {
      type: 'boolean',
      default: false,
    },
  },

  get: function(index) {
    if(typeof this._options[index] !== 'undefined') {
      if(typeof localStorage[index] === 'string') {
        switch(this._options[index].type) {
          case 'boolean':
            return localStorage[index] === 'true';
            break;
          case 'string':
            return localStorage[index];
            break;
          case 'number':
            return parseInt(localStorage[index]);
            break;
        }
        console.error('appOptions: unknown datatype!');
      } else {
        return this._options[index].default;
      }
    } else {
      console.error('appOptions: "' + index + '" is not defined');
    }
  },

  getNames: function() {
    var names = [];

    for(var name in this._options) {
      names.push(name);
    }

    return names;
  },

 /***
  * Generates an input element for the desired option
  * this might also want to have a callback?
  *
  * @param {string} name (option name)
  * @param {function} callback (on form change)
  * @return {jqueryObj} $input
  */
  getInputElement: function(name) {
    var $input = $('<input></input>').attr('name', name);

    switch(this._options[name].type) {
      case 'boolean':
        $input.attr('type', 'checkbox').prop('checked', this.get(name));
        break;
      case 'string':
      case 'number':
        break;
    }

    return $input;
  },

  set: function() {
    
  }
}

var options = {
  render: function() {
    appOptions.getNames().forEach(function(name) {
      $inputElement = $('<div>' + name + ': </div>').addClass('option').append(appOptions.getInputElement(name));
      $('body').append($inputElement);
    });
  }
}

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  kittenGenerator.requestKittens();
  options.render();
});
