Multitouch
===========
Handling single touches is pretty easy—not that much different from handling
mouse events. But what about multiple touches?

Accepting Multiple Touches
---------------------------
First, you have to tell your view that you do, indeed want to receive multiple
touches. By default, views only receive single touches. This is because is easier 
to think in a single-touch model, and most controls only need to track a single touch.

To accept multiple touches, just set the view's `#js:acceptsMultitouch` property to
`#js:YES`.

    #js
    view = SC.View.extend({
      acceptsMultitouch: YES
    });

Processing the Individual Touches
-----------------------------------
Even without the supplied helper function, processing individual touches is relatively
simple:

- You get a separate `#js:touchStart` for each individual touch.
- You get a separate `#js:touchEnd` for each individual touch.
- You get one `#js:touchesDragged` each event cycle for all of your touches put together.

So, detecting individual touches starting and ending is simple. Detecting those touches
moving is not quite as simple, but still relatively easy.

Remember how `#js:touchesDragged` works:

    #js
    touchesDragged: function(evt, touches)

`#js:touches` is an SC.CoreSet of SC.Touch objects. What can you do with a CoreSet? 
You can do a couple of things:

- Turn it into an array and do whatever.
- Call .forEach to iterate.

But you don't have to use the touches set at all. The `#js:evt` has some useful properties and methods,
too:

- pageX/pageY: the position of the first touch.
- averagedTouchesForView: a method which returns the averaged touch position
  and the average distance of the touches from that position.

`#js:SC.ScrollView`, for instance, makes heavy use of `#js:averagedTouchesForView`, and never
directly touches the `#js:touches` set.


Averaging Touches
------------------
It is often _very_ useful to average the touches. 

`#js:averagedTouchesForView` returns an object with four properties:

- **`#js:x`**: The average X position of the touch.
- **`#js:y`**: The average Y position of the touch.
- **`#js:d`**: average distance of the all touches from the average x/y position.
- **`#js:touchCount`** The number of touches averaged.

You can call `#js:averagedTouchesForView` on two separate objects: an `#js:SC.Event` object,
or an `#js:SC.Touch` object.

The two work identically but for one important difference: when you call it on `#js:SC.Touch`,
you _have the option_ of telling the touch to add itself to the averaged set. Doing so makes no sense
in most cases: the touch would just be counted twice! But what about `#js:touchStart`?

Recall that during `#js:touchStart`, the view does not yet own the touch. So, `#js:averagedTouchesForView`
would not, by default count it.

    #js
    // on an event:
    var a = evt.averagedTouchesForView(this);
    
    // on a touch
    var a = touch.averagedTouchesForView(this);
    
    // on a touch, counting the touch itself
    var a = touch.averagedTouchesForView(this, YES);

Thinking it Over
------------------
How might you use all of these to produce a good result?

Let's take a simple example: moving and resizing something:

{{demo:sc|multitouch.js}}



