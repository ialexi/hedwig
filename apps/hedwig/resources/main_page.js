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
          classNames: ["desk"],
          contentView: SC.SourceListView.design({
            classNames: ["desk"],
            contentBinding: "Hedwig.guideBrowserController.arrangedObjects",
            selectionBinding: "Hedwig.guideBrowserController.selection",
            contentValueKey: "title"
          })
        })
      }),

      detailView: SC.View.design(Hedwig.TouchHelper, {
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

        contentView: Hedwig.ArticleView.design({

        }),


        _dragOffset: 0,
        _reposition: function() {
          this.get("layer").style.webkitTransform = "translate3d(" + this._dragOffset + "px,0px,0px)";
        },


        captureTouch: function() {
          return YES;
        },

        touchStart: function(touch) {
          this._ownedTouch = NO;

          this._startDragOffset = this._dragOffset;

          return YES;
        },

        touchesDragged: function(evt, touches) {
          touches.forEach(function(touch){
            var couldBe = this.mapTouch(touch);
            if (couldBe.RELEASE && !this._ownedTouch) {
              touch.captureTouch(this, YES);
              return;
            } else if (couldBe.drag || couldBe.swipe) {
              /*
              var deltaX = touch.pageX - touch.startX, v = 0, m = (deltaX < 0 ? -1 : 1);
              for (var i = 0, da = Math.ceil(Math.abs(deltaX) / 10); da > i; i++) {
                v += m * 10 * Math.pow(0.96, i);
              }
              this._dragOffset = this._startDragOffset + v;
              this._reposition();
              this._ownedTouch = YES;
              */
            }
          }, this);


        },

        touchEnd: function(touch) {
          var couldBe = this.mapTouch(touch);
          if (this._ownedTouch) {

          } else if (couldBe.tap) {
            // first, try to see if anyone else wants it
            touch.captureTouch(this, YES);
            if (touch.touchResponder && touch.touchResponder !== this) touch.end();
          }
        }

      })
    })
  })

});
