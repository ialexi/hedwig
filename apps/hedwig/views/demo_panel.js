// ==========================================================================
// Project:   Hedwig.DemoPanel
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Hedwig */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Hedwig.DemoPanel = SC.PanelPane.extend(
/** @scope Hedwig.DemoPanel.prototype */ {
  defaultResponder: Hedwig,
  layout: { top: 0, bottom: 0, width: 768, centerX: 0 },
  contentView: null,
  theme: "popover"
});

Hedwig.DemoPanel.generateWithView = function(view) {
  return Hedwig.DemoPanel.create({
    contentView: SC.WorkspaceView.design({
      topToolbar: SC.ToolbarView.design({
        childViews: "close source".w(), // not "closed" source-- close & source
        close: SC.ButtonView.design({
          layout: { left: 7, centerY: 0, height: 30, width: 100 },
          title: "Close",
          action: "closeDemo"
        }),

        source: SC.ButtonView.design({
          layout: { right: 7, centerY: 0, height: 30, width: 100 },
          title: "Source",
          action: "showDemoSource"
        })
      }),
      contentView: view
    })
  });
};