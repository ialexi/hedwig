/*global Hedwig */
require("responders/DEMO");
Hedwig.SOURCE = SC.Responder.create({
  nextResponder: Hedwig.DEMO,
  didBecomeFirstResponder: function() {
    Hedwig.demoController.openSource();
  },
  
  willLoseFirstResponder: function() {
    Hedwig.demoController.closeSource();
  },
  
  closeSource: function() {
    Hedwig.makeFirstResponder(Hedwig.DEMO);
    Hedwig.invokeLater("sendAction", 150, "closeDemo");
  },
  
  showDemo: function() {
    Hedwig.makeFirstResponder(Hedwig.DEMO);
  }
});