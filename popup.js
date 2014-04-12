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
          $img.attr('src', faces[i].image);
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

  get: function(index, callback) {
    if(typeof this._options[index] !== 'undefined') {
      chrome.storage.local.get(index, function(item) {
        if(item[this.index] !== 'undefined') {
          this.callback(item[this.index]);
        } else {
          this.callback(this.self._options[this.index].default);
        }
      }.bind({self: this, index: index, callback: callback}));
    } else {
      console.error('appOptions: "' + index + '" is not defined');
    }
  },

  save: function(index, value) {
    var obj = {};
    obj[index] = value;

    chrome.storage.local.set(obj);
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
  * @return {jqueryObj} $input
  */
  getInputElement: function(name) {
    var $input = $('<input></input>').attr('name', name);

    switch(this._options[name].type) {
      case 'boolean':
        this.get(name, function(value) {
          $input.attr('type', 'checkbox').prop('checked', value);
        });
        break;
      case 'string':
      case 'number':
        break;
    }

    _this = this;

    $input.change(function(){
      _this.save($(this).attr('name'), $(this).prop('checked'));
    });

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
