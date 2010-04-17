/**
  This is similar to the "Capturing" example.
  
  In fact, the outer view is identical. Only the inner view has changed.
  As we can't pass control back without stacking, this demo _only_ includes
  the stacking method.
  
  The inner view, just like the outer view, passes control back after a specific
  time period.
*/
var Tester = SC.View.extend({
  backgroundColor: "white",
  
  captureTouch: function() {
    return YES;
  },
  
  touchStart: function(touch) {
    this._hasTouch = touch;
    this.get("layer").style.backgroundColor = "red";
    
    // in one second, we'll pass the touch along.
    this.invokeLater("beginContentTouches", 1000, touch);
    return YES;
  },
  
  beginContentTouches: function(touch) {
    // if our touch hasn't changed in the meantime
    if (touch === this._hasTouch) {
      // we'll pass the touch along.
      touch.captureTouch(this, YES);
    }
  },
  
  touchEnd: function(touch) {
    this._hasTouch = NO;
    this.get("layer").style.backgroundColor = "white";
  },
  
  touchCancelled: function(touch) {
    this._hasTouch = NO;
    this.get("layer").style.backgroundColor = "white";
  },
  
  childViews: "inner".w(),
  inner: SC.View.design({
    layout: { left: 50, top: 50, right: 50, bottom: 50 },
    backgroundColor: "gray",
    touchStart: function(touch) {
      this._touch = touch;
      this.get("layer").style.backgroundColor = "blue";
      this.invokeLater("releaseTouch", 1000, touch);
      return YES;
    },
    
    releaseTouch: function(touch) {
      if (touch === this._touch) {
        touch.makeTouchResponder(touch.nextTouchResponder);
      }
    },
    
    touchEnd: function(touch) {
      this._touch = NO;
      this.get("layer").style.backgroundColor = "gray";
    },
    
    touchCancelled: function(touch) {
      this._touch = NO;
      this.get("layer").style.backgroundColor = "gray";
    }
    
  })
  
});

var MyExampleView = SC.View.extend({
  backgroundColor: "#aaa",
  childViews: "demo".w(),
  demo: Tester.extend({
    layout: { top: 10, left: 10, width: 200, height: 200 },
    shouldStack: YES
  })
});

// bootstrap code :)
exports.getDemoView = function() {
  return MyExampleView;
};
