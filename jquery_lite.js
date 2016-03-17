(function(root) {
  "use strict";

  root.$l = function ( arg ) {
    if (typeof arg === "string"){
      var htmlEls = document.querySelectorAll(arg);
      return new DOMNodeCollection(htmlEls);
    } else if (arg instanceof HTMLElement) {
      return new DOMNodeCollection([arg]);
    }
  };

  var DOMNodeCollection = function(htmlEls){
    this.htmlEls = htmlEls;
    this.length = htmlEls.length;
  };

  DOMNodeCollection.prototype.html = function (string) {
    if (typeof string === "undefined") {
      return this.htmlEls[0].innerHTML;
    } else {
      this.forEach( function(htmlEl) {
        htmlEl.innerHTML = string;
      });
    }
  };

  DOMNodeCollection.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
      callback(this.htmlEls[i]);
    }
  };
  // DOMNodeCollection.prototype.length = function () {
  //   return this.htmlEls.length;
  // };

  DOMNodeCollection.prototype.empty = function () {
    this.forEach( function(htmlEl) {
      htmlEl.innerHTML = "";
    });
  };

  DOMNodeCollection.prototype.append = function (input) {
    var injectContent = "";
    if (input instanceof DOMNodeCollection){
      this.forEach( function(htmlEl) {
        injectContent += htmlEl.outerHTML;
      });
    } else if ( input instanceof HTMLElement ) {
      injectContent += input.outerHTML;
    } else {
      injectContent += input;
    }
    this.forEach( function(htmlEl) {
      var existingHTML = htmlEl.innerHTML;
      htmlEl.innerHTML = existingHTML + injectContent;
    });
  };

  DOMNodeCollection.prototype.attr = function (input, val) {
    if ( arguments.length === 1 ) {
      if ( input instanceof String){
        return this.htmlEls[0].getAttribute(input);
      } else {
        var callback = function(htmlEl) {
          htmlEl.setAttribute(key, input[key]);
        };
        for (var key in input) {
          this.forEach(callback);
        }
      }
    } else {
      this.forEach( function(htmlEl) {
        htmlEl.setAttribute(input, val);
      });
    }
  };

  DOMNodeCollection.prototype.addClass = function (klass) {
    this.forEach( function (htmlEl) {
      htmlEl.classList.add(klass);
    });
  };

  DOMNodeCollection.prototype.removeClass = function (klass) {
    this.forEach( function (htmlEl) {
      htmlEl.classList.remove(klass);
    });
  };

  DOMNodeCollection.prototype.toggleClass = function (klass) {
    this.forEach( function (htmlEl) {
      htmlEl.classList.toggle(klass);
    });
  };

  DOMNodeCollection.prototype.showSennacy = function () {
    this.append("<img class ='sennacy' src='http://www.sennacy.com/sennacy.jpg'>");
  };

  DOMNodeCollection.prototype.children = function () {
    var allChildren = [];

    this.forEach( function (htmlEl) {
      allChildren = allChildren.concat( [].slice.call(htmlEl.children) );
    });

    return new DOMNodeCollection( allChildren );
  };

  DOMNodeCollection.prototype.first = function () {
    return new DOMNodeCollection([this.htmlEls[0]]);
  };

  DOMNodeCollection.prototype.last = function () {
    return new DOMNodeCollection([this.htmlEls[ this.length - 1 ]]);
  };

  DOMNodeCollection.prototype.firstChild = function () {
    return this.children().first();
  };

  DOMNodeCollection.prototype.lastChild = function () {
    return this.children().last();
  };

})(this);
