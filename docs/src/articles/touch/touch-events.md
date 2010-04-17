Touch Events
=============

SproutCore's touch events have a few great features:

- Multiple views can receive touches simultaneously.
- A single view can receive multiple touches.
- A view can capture touches before allowing them to pass through to children.
- Child views can release touches back to parent views that originally captured them.

We won't get into the last two in this article—they're quite sophisticated!

Simple Single-Touch Handling
=====================================================
You may be familiar with this SC.View method signature if you are familiar with SproutCore:

    #js
    mouseDown: function(evt)

With `#js:mouseDown`, you can decide whether or not to accept the mouse event by returning either
`#js:YES` or `#js:NO`.

Touch events are similar, but work a bit differently:

    #js
    touchStart: function(touch)

Instead of being passed a raw event, `#js:touchStart` is passed an `#js:SC.Touch` object.
If you return YES from touchStart, your view will "own" the touch—in SproutCore terms, your
view will be the _touch responder_. For more information about what this entails, see
the "Internals" article. Your view will own the touch until the touch ends.

`#js:touchStart` will be called once for every touch that touches the view.

**Note:** By default, views only receive `#js:touchStart` and touchEnd for a single touch. This is
a feature intended to make it easier to handle such cases, very similar to Cocoa Touch's `#js:acceptsMultitouch`
property—actually, SC.View uses the same property name! See the "Multitouch" article.

Anatomy of an SC.Touch
------------------------
SC.Touch represents the touch from the time the user puts their finger on the screen until the time they lift it.

The touch object acts like an event object in many ways. It has many other useful things, as well:

- `#js:pageX` and `#js:pageY` for the touch
- `#js:event`: if in an event cycle, this contains the event. Otherwise, it is `#js:undefined`. 
  You will probably never need to access this.
- `#js:preventDefault`: if the touch is connected with an event, this calls `#js:preventDefault()` on the event.
- `#js:touchesForView(view)`: when supplied a view, will find all touches that the view is the
  touch responder for. It is a CoreSet; to get an array, call `#js:.toArray` on the result.
- `#js:averagedTouchesForView(view)`: When supplied a view, averages all the touches on that view,
  returning both an average position and an average distance from that position.

**Note:** If you call `#js:touchesForView(this)` from `#js:touchStart`, the touch supplied will not be in the set
returned by `#js:touchesForView(this)`: you don't own the touch until you return YES.

touchEnd
-----------------
Knowing when the touch starts is not very useful. At the very least, you will likely want to know when the touch
ends as well.

It is quite simple:

    #js
    touchEnd: function(touch)

It works exactly like `#js:touchStart`. The touch will no longer be in the set of touches for the view,
so if you call `#js:touch.touchesForView(this)`, you'll only receive any other active touches. If your
view does not accept multitouch, then the set is guaranteed to have no touches in it—you only receive
`#js:touchEnd` for the last touch that ends.

Tracking Touches
------------------
Tracking touch movement is simple:

    #js
    touchesDragged: function(evt, touches)

The `#js:touches` argument is the set of touches on the view—the same set you get by calling `#js:touchesForView(this)`.
This will have _all_ touches, regardless of whether or not your view accepts multitouch.

If your view does _not_ accept multitouch, then it is even simpler:

    #js
    x = evt.pageX;
    y = evt.pageY;

Tip: Cross-Platform-iness
--------------------------
Did you realize that, assuming you don't use the set of view touches or other touch-specific API,
you can do this:

    #js
    mouseDown: function(evt) {
      this.touchStart(evt);
    },
    
    mouseDragged: function(evt) {
      this.touchesDragged(evt);
    },
    
    mouseUp: function(evt) {
      this.touchEnd(evt);
    }

Of course, you can also redirect touch events to mouse events, but that is not as fun.

Putting it All Together
------------------------
Here is a very simple demo that uses the methods described above to allow the user to move two views
around the screen:

{{demo:sc|touch-demo.js}}

