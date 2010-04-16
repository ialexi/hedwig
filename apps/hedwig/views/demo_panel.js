// ==========================================================================
// Project:   Hedwig.DemoPanel
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Hedwig */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Hedwig.DemoPanel = SC.PanelPane.extend(SC.Animatable,
/** @scope Hedwig.DemoPanel.prototype */ {
  classNames: "demo".w(),
  
  defaultResponder: Hedwig,
  layout: { top: 0, bottom: 0, width: 768, centerX: 0 },
  contentView: null,
  theme: "pig"
});

Hedwig.DemoPanel.generateWithView = function(view) {
  return Hedwig.DemoPanel.create({
    contentView: SC.View.design({
      childViews: "front back".w(),
      init: function() {
        sc_super();
        SC.Timer.schedule({
          interval: 1000,
          target: this,
          action: "flip",
          repeats: YES
        });
        
        if (SC.Animatable.enableCSS3DTransforms) {
          this.back.flip(180, YES);
        } else {
          this.back.set("isVisible", NO);
        }
      },
      
      nowShowing: "none",
      flip: function() {
        if (this.get("nowShowing") == "back") this.set("nowShowing", "front");
        else this.set("nowShowing", "back");
      },
      
      nowShowingDidChange: function() {
        var ns = this.get("nowShowing");
        if (ns == "front") {
          if (SC.Animatable.enableCSS3DTransforms) {
            this.front.flip(0);
            this.back.flip(180);
          } else {
            this.front.set("isVisible", YES);
            this.back.set("isVisible", NO);
          }
        } else {
          if (SC.Animatable.enableCSS3DTransforms) {
            this.front.flip(180);
            this.back.flip(360);
          } else {
            this.back.set("isVisible", YES);
            this.front.set("isVisible", NO);
          }
        }
      }.observes("nowShowing"),
      
      back: SC.WorkspaceView.design(SC.Animatable, {
        classNames: "flippable".w(),
        transitions: {
          "transform": {
            "duration": 0.5, timing: SC.Animatable.TRANSITION_EASE_IN_OUT
          }
        },
        style: {
          "rotateY": "0deg"
        },

        flip: function(rot, d) {
          if (d) this.disableAnimation();
          this.adjust({
            "transform": "rotateY(" + rot + "deg)"
          });
          if (d) this.enableAnimation();
        },
        
        
        topToolbar: SC.ToolbarView.design({
          layout: { top: 0, height: 44, left: 0, right: 0 },
          childViews: "close source".w(), // not "closed" source-- close & source
          close: SC.ButtonView.design({
            layout: { left: 7, centerY: 0, height: 30, width: 100 },
            title: "Close",
            action: "closeSource",
            controlSize: SC.AUTO_CONTROL_SIZE,
            isCancel: YES
          }),

          source: SC.ButtonView.design({
            layout: { right: 7, centerY: 0, height: 30, width: 100 },
            title: "Demo",
            action: "showDemo",
            controlSize: SC.AUTO_CONTROL_SIZE,
            isDefault: YES
          })
        }),
        contentView: SC.ScrollView.design({
          classNames: "source".w(),
          borderStyle: SC.BORDER_NONE,
          contentView: SC.StaticContentView.design({
            classNames: "source".w(),
            contentBinding: "Hedwig.demoController.preparedSource"
          })

        })
      }),
      
      front: SC.WorkspaceView.design(SC.Animatable, {
        classNames: "flippable".w(),
        transitions: {
          "transform": {
            "duration": 0.5, timing: SC.Animatable.TRANSITION_EASE_IN_OUT
          }
        },
        style: {
          "rotateY": "0deg"
        },

        flip: function(rot) {
          this.adjust({
            "transform": "rotateY(" + rot + "deg)"
          });
        },

        topToolbar: SC.ToolbarView.design({
          layout: { top: 0, height: 44, left: 0, right: 0 },
          childViews: "close source".w(), // not "closed" source-- close & source
          close: SC.ButtonView.design({
            layout: { left: 7, centerY: 0, height: 30, width: 100 },
            title: "Close",
            action: "closeDemo",
            controlSize: SC.AUTO_CONTROL_SIZE,
            isCancel: YES
          }),

          source: SC.ButtonView.design({
            layout: { right: 7, centerY: 0, height: 30, width: 100 },
            title: "Source",
            action: "showSource",
            controlSize: SC.AUTO_CONTROL_SIZE,
            isDefault: YES
          })
        }),
        contentView: view
      })
    })
  });
};