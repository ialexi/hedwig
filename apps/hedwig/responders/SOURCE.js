/*global Hedwig */
require("responders/NORMAL");
Hedwig.SOURCE = SC.Responder.create({
  nextResponder: Hedwig.NORMAL,
  didBecomeFirstResponder: function() {
    Hedwig.demoController.openSource();
  },
  
  willLoseFirstResponder: function() {
    Hedwig.demoController.closeSource();
  },
  
  closeSource: function() {
    Hedwig.makeFirstResponder(Hedwig.NORMAL);
  },
  
  showDemo: function() {
    Hedwig.makeFirstResponder(Hedwig.DEMO);
  }
});