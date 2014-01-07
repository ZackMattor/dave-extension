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
    xhr.open("GET", "http://localhost:3000/faces.json", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        faces=JSON.parse(this.responseText).faces
        debugger
        for (var i = 0; i < faces.length; i++) {
          var $img = $('<img>');
          $img.attr('src', "http://localhost:3000/" + faces[i].image);
          $('body').append($img);
        }
      }
    }
    xhr.send();
  },
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  kittenGenerator.requestKittens();
});
