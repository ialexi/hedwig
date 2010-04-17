/*global Hedwig*/
Hedwig.ArticleView = SC.View.extend(Hedwig.TouchHelper, {
  childViews: "contentView".w(),
  
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
    // check for release
    touches.forEach(function(touch){
      var couldBe = this.mapTouch(touch);
      if (couldBe.RELEASE) {
        touch.captureTouch(this, YES);
        return;
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
      touchStart: function(touch) { return this.mouseDown(touch); },
      
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
        
        return NO;
      }
    })
  })
});