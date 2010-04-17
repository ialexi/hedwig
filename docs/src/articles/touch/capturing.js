/**
   This is our test view. It will capture a touch, and, after one second,
   pass it through to the child view. Depending on the shouldStack property,
   it will stack while passing.
   
   In this example, the top view stacks, the bottom one does not.
*/
var Tester = SC.View.extend({
  backgroundColor: "white",
  
  shouldStack: NO,
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
      touch.captureTouch(this, this.get("shouldStack"));
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
    touchStart: function() {
      this.get("layer").style.backgroundColor = "blue";
      return YES;
    },
    
    touchEnd: function() {
      this.get("layer").style.backgroundColor = "gray";
    }
    
  })
  
});

var MyExampleView = SC.View.extend({
  backgroundColor: "#aaa",
  childViews: "stacks doesNot".w(),
  stacks: Tester.extend({
    layout: { top: 10, left: 10, width: 200, height: 200 },
    shouldStack: YES
  }),
  
  doesNot: Tester.extend({
    layout: { top: 230, left: 10, width: 200, height: 200 },
    shouldStack: NO    
  })
});

// bootstrap code :)
exports.getDemoView = function() {
  return MyExampleView;
};
