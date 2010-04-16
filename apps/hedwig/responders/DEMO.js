/*global Hedwig */
Hedwig.DEMO = SC.Responder.create({
  didBecomeFirstResponder: function() {
    Hedwig.demoController.openDemo();
  },
  
  closeDemo: function() {
    Hedwig.demoController.closeDemo();
    Hedwig.makeFirstResponder(Hedwig.NORMAL);
  }
});