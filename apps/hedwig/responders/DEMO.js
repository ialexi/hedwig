/*global Hedwig */
require("responders/NORMAL");
Hedwig.DEMO = SC.Responder.create({
  nextResponder: Hedwig.NORMAL,
  didBecomeFirstResponder: function() {
    Hedwig.demoController.openDemo();
  },
  
  willLoseFirstResponder: function() {
    Hedwig.demoController.closeDemo();
  },
  
  closeDemo: function() {
    Hedwig.makeFirstResponder(Hedwig.NORMAL);
  },
  
  showSource: function() {
    Hedwig.makeFirstResponder(Hedwig.SOURCE);
  }
});