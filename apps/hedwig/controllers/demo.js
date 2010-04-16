// ==========================================================================
// Project:   Hedwig.demoController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Hedwig */
/*jslint evil:true */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Hedwig.demoController = SC.ObjectController.create(
/** @scope Hedwig.demoController.prototype */ {

  demo: null,
  demoSource: function() {
    return Hedwig.articleController.demoFor(this.get("demo"));
  }.property("demo").cacheable(),
  
  openDemo: function() {
    try {
      var source = this.get("demoSource");
      
      //err... yes, this very badly immitates CommonJS modules. Sorry. :(
      var obj = {};
      var res = function (exports) {
        // load module
        eval(source);
      }(obj);
    
      var demoPanel = Hedwig.DemoPanel.generateWithView(obj.getDemoView());
      demoPanel.append();
      this._openDemoPanel = demoPanel;
      
    } catch (e) {
      
    }
  },
  
  closeDemo: function() {
    this._openDemoPanel.remove();
  }

}) ;
