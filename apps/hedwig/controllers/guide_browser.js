// ==========================================================================
// Project:   Hedwig.guideBrowserController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Hedwig */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Hedwig.guideBrowserController = SC.TreeController.create(
/** @scope Hedwig.guideBrowserController.prototype */ {
  contentBinding: "Hedwig.guideController.guideTree",


  treeItemChildrenKey: "treeItemChildren",
  treeItemIsGrouped: YES,
  treeItemIsExpandedKey: "treeItemIsExpanded",

  allowsMultipleSelection: NO,
  allowsEmptySelection: NO,

  _getSelectionIndexSet: function(){
    var ao = this.get("arrangedObjects");
    return this.get("selection").indexSetForSource(ao);
  },

  hasPreviousArticle: function() {
    return !!this.get("previousArticle");
  }.property("previousArticle").cacheable(),

  hasNextArticle: function() {
    return !!this.get("nextArticle");
  }.property("nextArticle").cacheable(),

  previousArticle: function() {
    var ao = this.get("arrangedObjects"), set = this.get("selection").indexSetForSource(ao);
    if (!set) return NO;

    var first = set.get("min");
    var indexes = ao.contentGroupIndexes(null, ao);

    // now start trying indexes
    var idx = first - 1;
    for (; idx >= 0; idx--) {
      if (!indexes.contains(idx)) return ao.objectAt(idx);
    }
    return null;
  }.property("selection", "arrangedObjects").cacheable(),

  nextArticle: function(){
    var ao = this.get("arrangedObjects"), set = this.get("selection").indexSetForSource(ao);
    if (!set) return;

    var last = set.get("max");
    var indexes = ao.contentGroupIndexes(null, ao);

    // now start trying indexes
    var idx = last, len = ao.get("length");
    for (; idx < len; idx++) {
      if (!indexes.contains(idx)) return ao.objectAt(idx);
    }
    return null;
  }.property("arrangedObjects", "selection").cacheable()
}) ;
