(function(root) {
  "use strict";

  var DOMNodeCollection = function(htmlEls){
    this.htmlEls = htmlEls;
    this.length = htmlEls.length;
  };

  DOMNodeCollection.prototype.html = function (string) {
    if (typeof string === "undefined") {
      return this.htmlEls[0].innerHTML;
    } else {
      for(var i = 0; i < this.length; i++) {
        this.htmlEls[i].innerHTML = string;
      }
    }
  };

  // DOMNodeCollection.prototype.length = function () {
  //   return this.htmlEls.length;
  // };

  DOMNodeCollection.prototype.empty = function () {
    for(var i = 0; i < this.length; i++) {
      this.htmlEls[i].innerHTML = "";
    }
  };

  DOMNodeCollection.prototype.append = function (input) {
    var injectContent = "";
    if (input instanceof DOMNodeCollection){
      for (var i = 0; i < input.length; i++) {
        injectContent += input.htmlEls[i].outerHTML;
      }
    } else if ( input instanceof HTMLElement ) {
      injectContent += input.outerHTML;
    } else {
      injectContent += input;
    }
    for (var i = 0; i < this.length; i++ ) {
      var existingHTML = this.htmlEls[i].innerHTML;
      this.htmlEls[i].innerHTML = existingHTML + injectContent;
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
