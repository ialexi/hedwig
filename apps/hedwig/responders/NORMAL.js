/*global Hedwig */
Hedwig.NORMAL = SC.Responder.create({
  didBecomeFirstResponder: function() {
  },
  
  openDemo: function(demo) {
    Hedwig.demoController.set("demo", demo);
    Hedwig.makeFirstResponder(Hedwig.DEMO);
  },
  
  nextArticle: function() {
    Hedwig.guideBrowserController.selectObject(Hedwig.guideBrowserController.get("nextArticle"));
  },
  
  previousArticle: function() {
    Hedwig.guideBrowserController.selectObject(Hedwig.guideBrowserController.get("previousArticle"));
  },
  
  toggleToolbar: function() {
    console.error("T");
    Hedwig.articleController.toggleToolbar();
  }
});