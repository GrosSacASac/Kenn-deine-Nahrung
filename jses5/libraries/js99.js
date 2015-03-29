"use strict";

var JS99 = (function () {
  "use strict";
  var vars = {},
      varListeners = {},
      nodes = {};

  /* 
    define your event Listener here.
    You can use vars and nodes
    varListeners contains arrays of nodes , each array contains all nodes
      that listen to the same variable. You should have no good reason to use varListeners. Instead use nodes
      
    If you have this in your document <input data-99-var="a">
      --> you can then use vars.a or vars["a"] here
      --> you can then use JS99.vars.a
          or               JS99.vars.["a"] in your js
      all assignments will be reflected in the document
      
      
    If you have this in your document <div data-99-node="box1"></div>
      --> you can then use nodes.box1 or nodes["box1"]
      it is basically a short cut for getElementBy...()
    
  */

  var start = function start() {};

  return {
    vars: vars,
    varListeners: varListeners,
    nodes: nodes };
})();