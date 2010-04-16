/*global Hedwig*/
Hedwig.START = SC.Responder.create({
  didBecomeFirstResponder: function() {
    Hedwig.getPath('mainPage.mainPane').append() ;
    Hedwig.guidesController.loadGuide(Hedwig.guidePath);
    Hedwig.invokeLater("makeFirstResponder", 1, Hedwig.NORMAL);
  }
});