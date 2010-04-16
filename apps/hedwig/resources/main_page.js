// ==========================================================================
// Project:   Hedwig - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Hedwig */
/*
  Hedwig UI
  ---------
  In short, we've got a standard iPad style two-up layout. In this case, we have
  a MasterDetailView containing the left side and the right side.
*/
Hedwig.guidePath = sc_static("guide/touch.json");

Hedwig.mainPage = SC.Page.design({
  
  mainPane: SC.MainPane.design({
    defaultResponder: Hedwig.NORMAL,
    
    theme: "pig",
    childViews: 'docs'.w(),
    
    docs: SC.MasterDetailView.design({
      autoHideMaster: YES,
      
      // have to use workspace for master because it renders the popover (that we do need)
      masterView: SC.WorkspaceView.design({
        topToolbar: null,
        contentView: SC.ScrollView.design({
          contentView: SC.SourceListView.design({
            classNames: ["desk"]  ,
            contentBinding: "Hedwig.guideBrowserController.arrangedObjects",
            selectionBinding: "Hedwig.guideBrowserController.selection",
            contentValueKey: "title"
          })
        })
      }),
      
      detailView: SC.WorkspaceView.design({
        theme: "paper",
        topToolbar: SC.ToolbarView.design(SC.FlowedLayout, {
          autoResize: NO,
          flowPadding: {top:0,bottom:0,right:10,left:10},
          childViews: "title previous guide space next".w(),
          previous: SC.ButtonView.design({
            layout: { width: 44, height: 44 },
            theme: "icon",
            icon: "previous",
            isEnabled: NO,
            isEnabledBinding: "Hedwig.guideBrowserController.hasPreviousArticle",
            action: "previousArticle"
          }),
          guide: SC.ButtonView.design({
            layout: { width: 100, height: 44 },
            title: "Guide",
            theme: "chromeless",
            isVisible: NO,
            action: "toggleMasterPicker",
            isVisibleBinding: ".parentView.masterIsHidden"
          }),
          space: SC.View.design({ isSpacer:YES }),
          next: SC.ButtonView.design({
            layout: { width: 44, height: 44 },
            theme: "icon",
            icon: "next",
            action: "nextArticle",
            isEnabled: NO,
            isEnabledBinding: "Hedwig.guideBrowserController.hasNextArticle"
          }),
          
          title: SC.LabelView.design({
            useAbsoluteLayout: YES,
            layout: { left: 0, right: 0, centerY: 0, height: 20 },
            textAlign: SC.ALIGN_CENTER,
            valueBinding: "Hedwig.articleController.title"
          })
          
        }),
        
        contentView: SC.ScrollView.design({
          borderStyle: SC.BORDER_NONE,
          contentView: SC.StaticContentView.design({
            contentBinding: "Hedwig.articleController.contents",
            contentDidChange: function() {
              sc_super();
              this.invokeLater("processContent", 1);
            }.observes("content"),
            
            processContent: function() {
              var d = this.$("a.demo").forEach(function(x) {
                x.outerHTML = Hedwig.articleController.replacementFor(x.getAttribute("href"));
              }, this);
            },
            touchStart: function(touch) { this.mouseDown(touch); },
            mouseDown: function(evt) {
              evt.preventDefault();
              
              var el = document.elementFromPoint(evt.pageX, evt.pageY), demoNode = null;
              while (el) {
                if (SC.$(el).hasClass("sc-view")) break;
                if (SC.$(el).hasClass("hedwig-demo")) {
                  demoNode = el;
                  break;
                }
                el = el.parentNode;
              }
              
              if (demoNode) {
                Hedwig.sendAction("openDemo", demoNode.getAttribute("href"));
              }
            }
          })
        })
      })
      
    })
  })

});
