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
  content: function() {
    return Hedwig.articleController.demoFor(this.get("demo"));
  }.property("demo").cacheable(),
  
  openDemo: function() {
    try {
      var source = this.get("ex");
      
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
  },
  
  openSource: function() {
    var sourcePanel = Hedwig.SourcePanel.create();
    sourcePanel.append();
    this._openSourcePanel = sourcePanel;
  },
  
  closeSource: function() {
    console.error("WHY MUST YOU INSIST ON CLOSING THE SOURCE CODE! IT IS AGAINST EVERYTHING I BELIEVE IN! I'M GONNA CRY!");
    this._openSourcePanel.remove();
  },
  
  preparedSource: function() {
    var h = this.get("highlighted");
    var linecount = h.split("\n").length;

    var output = "<div class='line-numbers'>";    
    for (var idx = 0; idx<linecount; idx++){
      output += "<span>" + (idx+1) + "</span>";
    }
    output += "</div>";
    output += "<div class='code'>";
    output += h;
    output += "</div>";
    return output;
  }.property("highlighted").cacheable()

}) ;
