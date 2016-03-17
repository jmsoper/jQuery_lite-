(function(root) {
  "use strict";

  var DOMNodeCollection = function(htmlEls){
    this.htmlEls = htmlEls;
  };

  DOMNodeCollection.prototype.html = function (string) {
    if (typeof string === "undefined") {
      return this.htmlEls[0].innerHTML;
    } else {
      for(var i = 0; i < this.htmlEls.length; i++) {
        this.htmlEls[i].innerHTML = string;
      }
    }
  };

  root.$l = function ( arg ) {
    if (typeof arg === "string"){
      var htmlEls = document.querySelectorAll(arg);
      return new DOMNodeCollection(htmlEls);
    } else if (arg instanceof HTMLElement) {
      return new DOMNodeCollection([arg]);
    }


  };

})(this);
