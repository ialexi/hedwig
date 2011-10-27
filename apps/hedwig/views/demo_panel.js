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
  modalPane: SC.ModalPane.extend(SC.Animatable, {
    classNames: 'for-sc-panel',
    transitions: {
      opacity: 0.25
    },
    style: {opacity: 0.0 }
  }),

  transitions: {
    transform: {
      duration: 0.5,
      timing: SC.Animatable.TRANSITION_EASE_IN_OUT
    },
    opacity: {
      duration: 0.5,
      timing: SC.Animatable.TRANSITION_EASE_IN_OUT,
      action: function(){
        if (this.style.opacity === 0) this._call_when_done();
      }
    }
  },
  style: { opacity: 0.0, transform: "scale3d(.1,.1,1)" },
  layout: { width: 250, height: 480 },
  theme: "popover",

  append: function() {
    sc_super();
    this.invokeLater("sizeUp", 1);
  },

  sizeUp: function() {
    this.adjust({
      opacity: 1,
      transform: "scale3d(1,1,1)"
    });
    this.modalPane.adjust("opacity", 0.50);
  },

  remove: function() {
    this._call_when_done = arguments.callee.base;
    this.adjust({
      opacity: 0,
      transform: "scale3d(.1,.1,1)"
    });
    this.modalPane.adjust("opacity", 0);
  },

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

        if (SC.Animatable.enableCSS3DTransforms) {
          this.back.flip(180, YES);
        } else {
          this.back.set("isVisible", NO);
        }
      },

      nowShowingBinding: "Hedwig.demoController.nowShowing",
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
            "duration": 0.6, timing: SC.Animatable.TRANSITION_EASE_IN_OUT
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