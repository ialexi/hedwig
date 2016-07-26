// ==========================================================================
// Project:   Hedwig.guideController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Hedwig */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Hedwig.guideController = SC.ObjectController.create(
/** @scope Hedwig.guideController.prototype */ {
  contentBinding: "Hedwig.guidesController.currentGuide",

  /**
    This builds a normalized tree structure usable by a TreeController.
    We do this because the guide format is in "pretty" JSON-- that is, its format makes sense to read.
    Property names such as "children" are not as friendly as "sections".
  */
  guideTree: function() {
    var content = this.get("content");
    if (!content) return SC.Object.create();

    var ret = SC.Object.create(content);
    ret.set("treeItemIsExpanded", YES);

    ret.set("treeItemChildren", content.sections.map(function(section){
      var ret = SC.Object.create(section);
      ret.set("treeItemIsExpanded", YES);
      ret.set("treeItemChildren", section.articles.map(function(article){
        var ret = SC.Object.create(article);
        ret.set("contents", ret.get("content")); // whoops. Preprocessor FAIL. It should have named it "contents," huh?
        return ret;
      }));
      return ret;
    }));

    return ret;
  }.property("content").cacheable()
}) ;
