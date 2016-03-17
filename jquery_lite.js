(function(root) {
  "use strict";

  var DOMNodeCollection = function(htmlEls){
    this.htmlEls = htmlEls;
  };

  root.$l = function ( arg ) {
    if (typeof arg === "string"){
      var htmlEls = document.querySelectorAll(arg);
      return new DOMNodeCollection(htmlEls);
    }


  };

})(this);
