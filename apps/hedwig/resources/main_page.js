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
      
      detailView: SC.View.design({
        classNames: ["paper-view"],
        theme: "paper",
        childViews: "contentView topToolbar".w(),
        
        // update master hidden status since we are doing this manually...
        masterIsHidden: NO,
        masterIsHiddenDidChange: function() { 
          this.topToolbar.set("masterIsHidden", this.get("masterIsHidden"));
        }.observes("masterIsHidden"),
        
        topToolbar: SC.ToolbarView.design(SC.Animatable, {
          masterIsHidden: NO,
          
          layout: { top: 0, right: 0, left: 0, height: 44 },
          
          style: {
            display: "block",
            opacity: 0.9
          },
          transitions: {
            display: 0.2,
            opacity: 0.1
          },
          
          isShowing: YES,
          isShowingBinding: "Hedwig.articleController.toolbarShouldShow",
          isShowingDidChange: function() {
            if (this.get("isShowing")) {
              this.disableAnimation();
              this.adjust({
                opacity: 0.9,
                display: "block"
              }).updateStyle();
              this.enableAnimation();
            } else {
              this.adjust({
                opacity: 0.0,
                display: "none"
              }).updateStyle();
            }
          }.observes("isShowing"),
          
          autoResize: NO,
          childViews: "title previous guide next".w(),
          previous: SC.ButtonView.design({
            layout: { left: 10, top: 0, width: 44, height: 44 },
            theme: "icon",
            icon: "previous",
            isEnabled: NO,
            isEnabledBinding: "Hedwig.guideBrowserController.hasPreviousArticle",
            action: "previousArticle"
          }),
          guide: SC.ButtonView.design({
            layout: { left: 64, width: 100, height: 44 },
            title: "Guide",
            theme: "chromeless",
            isVisible: NO,
            action: "toggleMasterPicker",
            isVisibleBinding: ".parentView.masterIsHidden"
          }),
          next: SC.ButtonView.design({
            layout: { right: 10, top: 0, width: 44, height: 44 },
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
        
        contentView: SC.View.design({
          childViews: "contentView".w(),
          
          /**
            touchGestures: Gestures dealing with single touches.
          */
          touchGestures: {
            "tap": { minX: 0, maxX: 3 },
            "drag": {minX: 5, maxX: 20},
            "swipe": { minX: 20 },
            "RELEASE": { minY: 20 }
          },
          
          captureTouch: function() {
            return YES;
          },
          
          /**
            Maps a delta to gestures 
          */
          mapDelta: function(deltaX, deltaY) {
            var key, gesture, gestures = this.get("touchGestures"), inGesture;
            var ret = {};
            
            // loop through and evaluate
            for (key in gestures) {
              gesture = this.touchGestures[key]; inGesture = YES;
              
              if ("minX" in gesture && deltaX < gesture.minX) inGesture = NO;
              if ("minY" in gesture && deltaY < gesture.minY) inGesture = NO;
              if ("maxX" in gesture && deltaX > gesture.maxX) inGesture = NO;
              if ("maxY" in gesture && deltaY > gesture.maxY) inGesture = NO;
              
              ret[key] = inGesture;
            }
            
            return ret;            
          },
          
          /**
            Finds out what gestures this touch could qualify for
          */
          mapTouch: function(touch) {
            // calculate deltaX/Y (should we cache our own versions, by any chance?)
            var deltaX = Math.abs(touch.pageX - touch.startX),
                deltaY = Math.abs(touch.pageY - touch.startY);
            
            return this.mapDelta(deltaX, deltaY);
          },
          
          mouseDown: function(evt) {
            this._mouseStart = { x: evt.pageX, y: evt.pageY };
            return YES;
          },
          
          mouseUp: function(evt) {
            var couldBe = this.mapDelta(Math.abs(evt.pageX-this._mouseStart.x), Math.abs(evt.pageY-this._mouseStart.y));
            if (couldBe.tap) this.tap();
          },
          
          touchStart: function(touch) {
            return YES;
          },
          
          touchesDragged: function(evt, touches) {
            touches.forEach(function(touch){
              var couldBe = this.mapTouch(touch);
              if (couldBe.RELEASE) {
                touch.captureTouch(this, YES);
              }
            }, this);
          },
          
          touchEnd: function(touch) {
            var couldBe = this.mapTouch(touch);
            if (couldBe.tap) {
              // first, try to see if anyone else wants it
              touch.captureTouch(this, YES);
              
              if (touch.touchResponder && touch.touchResponder !== this) touch.end();
              if (touch.touchResponder === this || !touch.touchResponder) {
                // otherwise, do what we want
                this.tap();
              }
            }
          },
          
          tap: function() {
            Hedwig.sendAction("toggleToolbar");
          },
          
          
          contentView: SC.ScrollView.design({
            borderStyle: SC.BORDER_NONE,
            contentView: SC.StaticContentView.design({
              contentBinding: "Hedwig.articleController.html",
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
                  return YES;
                }
                
              }
            })
          })
        })
        
        
        
      })
    })
  })

});
