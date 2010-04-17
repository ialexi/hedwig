var Box = SC.View.extend({
  _scale: 1,
  _translateX: 0,
  _translateY: 0,
  acceptsMultitouch: YES,
  touchStart: function(touch) {
    this.recomputeTouchStatus(touch, YES);
    return YES;
  },
  
  touchesDragged: function(evt, touches) {
    var t = this._touch;
    var avg = evt.averagedTouchesForView(this);
    
    // translation is easy:
    this._translateX = t.ourStart.x + avg.x - t.start.x;
    this._translateY = t.ourStart.y + avg.y - t.start.y;
    
    // mathematically speaking, scale *= the end distance / the start distance
    if (t.start.d > 1) { // but prevent divide-by-0
      this._scale = t.ourStart.scale * (avg.d / t.start.d);
    }
    
    // reposition
    this._reposition();
  },
  
  touchEnd: function(touch) {
    this.recomputeTouchStatus(touch, NO);
  },
  
  /**
     With this, we recompute our touch status--updating the start positioning and scale.
  */
  recomputeTouchStatus: function(touch, considerTouch) {
    var avg = touch.averagedTouchesForView(this, considerTouch);
    this._touch = {
      start: { x: avg.x, y: avg.y,  d: avg.d },
      ourStart: { x: this._translateX, y: this._translateY, scale: this._scale }
    };
  },
  
  /**
    Repositions the view.
  */
  _reposition: function() {
    this.get("layer").style.webkitTransform = 
      "translate3d(" + this._translateX + "px," + this._translateY + "px, 0px) " +
      "scale3d(" + this._scale + "," + this._scale + ",1)";
    console.error(this._translateX + " " + this._translateY + " " + this._scale);
  },
  
  // and now, redirect mouse events :)
  mouseDown: function(evt) {
    this.touchStart(evt);
  },
  
  mouseDragged: function(evt) {
    this.touchesDragged(evt);
  },
  
  mouseUp: function(evt) {
    this.touchEnd(evt);
  }
});
var MyExampleView = SC.View.extend({
  backgroundColor: "white",
  childViews: "box".w(),
  box: Box.design({
    backgroundColor: "red",
    layout: { left: 10, top: 10, width: 200, height: 200 }
  })
});

// bootstrap code :)
exports.getDemoView = function() {
  return MyExampleView;
};
