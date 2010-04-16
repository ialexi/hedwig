/*global Hedwig */
require("DEMO.js");
Hedwig.SOURCE = SC.Responder.create({
  nextResponder: Hedwig.DEMO,
  didBecomeFirstResponder: function() {
    
  }
});