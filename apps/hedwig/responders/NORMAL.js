/*global Hedwig */
Hedwig.NORMAL = SC.Responder.create({
  didBecomeFirstResponder: function() {
  },
  
  openDemo: function(demo) {
    Hedwig.demoController.set("demo", demo);
    Hedwig.makeFirstResponder(Hedwig.DEMO);
  },
  
  nextArticle: function() {
    if (!Hedwig.guideBrowserController.get("hasNextArticle")) return;
    Hedwig.guideBrowserController.selectObject(Hedwig.guideBrowserController.get("nextArticle"));
  },
  
  previousArticle: function() {
    if (!Hedwig.guideBrowserController.get("hasPreviousArticle")) return;
    Hedwig.guideBrowserController.selectObject(Hedwig.guideBrowserController.get("previousArticle"));
  },
  
  toggleToolbar: function() {
    Hedwig.articleController.toggleToolbar();
  }
});