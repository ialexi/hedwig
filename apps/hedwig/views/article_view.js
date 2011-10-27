/*global Hedwig*/
Hedwig.ArticleView = SC.View.extend(Hedwig.TouchHelper, {
  childViews: "contentView".w(),

  mouseDown: function(evt) {
    this._mouseStart = { x: evt.pageX, y: evt.pageY };
    return NO;
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

    htmlContent: "",
    htmlContentBinding: "Hedwig.articleController.html",
    htmlContentDidChange: function() {
      console.error("CDC");
      this.scrollTo(0,1);
    }.observes("htmlContent"),

    contentView: SC.StaticContentView.design({
      contentBinding: "Hedwig.articleController.html",
      didUpdateLayer: function() {
        sc_super();
        this.processContent();
      }.observes("content"),

      processContent: function() {
        var d = this.$("a.demo").each(function() {
          this.innerHTML = Hedwig.articleController.replacementFor(this.getAttribute("href"));
          this.setAttribute("href", "#");
        });
      },
      touchStart: function(touch) { return this.mouseDown(touch); },

      mouseDown: function(evt) {


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
          evt.preventDefault();
          return YES;
        }

        return NO;
      }
    })
  })
});