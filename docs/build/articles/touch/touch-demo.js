var Dot = SC.View.extend({
  touchStart: function(touch) {
    var f = this.get("frame");
    this._touch = {
      start: { x: touch.pageX, y: touch.pageY },
      ourStart: { x: f.x, y: f.y, width: f.width, height: f.height }
    };
    return YES; // or we won't get touchesDragged
  },
  
  touchesDragged: function(evt, touches) {
    var t = this._touch;
    this.set("layout", { 
      left: t.ourStart.x + evt.pageX - t.start.x,
      top: t.ourStart.y + evt.pageY - t.start.y,
      width: t.ourStart.width,
      height: t.ourStart.height
    });
  }
});
var MyExampleView = SC.View.extend({
  backgroundColor: "white",
  childViews: "dot1 dot2".w(),
  dot1: Dot.design({
    backgroundColor: "red",
    layout: { left: 10, top: 10, width: 100, height: 100 }
  }),
  dot2: Dot.design({
    backgroundColor: "blue",
    layout: { right: 10, bottom: 10, width: 100, height: 100 }
  })
});

// bootstrap code :)
exports.getDemoView = function() {
  return MyExampleView;
};
