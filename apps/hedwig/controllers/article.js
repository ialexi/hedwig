// ==========================================================================
// Project:   Hedwig.articleController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Hedwig */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Hedwig.articleController = SC.ObjectController.create(
/** @scope Hedwig.articleController.prototype */ {
  contentBinding: "Hedwig.guideBrowserController.selection",
  contentBindingDefault: SC.Binding.single(),
  
  html: function() {
    return "<div class='article'>" + (this.get("contents") || "") + "</div>";
  }.property("contents").cacheable(),
  
  toolbarShouldShow: YES,
  toggleToolbar: function() {
    this.set("toolbarShouldShow", !this.get("toolbarShouldShow"));
  },
  
  demoFor: function(href) {
    if (this.get("demos")) return this.get("demos")[href];
    return "";
  },
  
  replacementFor: function(href) {
    return "<div class='hedwig-demo' href='" + href + "' style=''>Example</div>";
  }
}) ;
