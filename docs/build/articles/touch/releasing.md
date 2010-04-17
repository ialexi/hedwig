Releasing
=========
Why would you want to give up a touch? Imagine that your control is inside a `#js:SC.ScrollView`:
if the touch moves too much, perhaps it should be considered a scroll, rather than an
action for your control.

From touchesDragged, you would give up touch responder status through a line like this:

    #js
    someTouch.makeTouchResponder(someTouch.nextTouchResponder);

The touch's nextTouchResponder is the responder that is the _parent_ touch responder; through
devious trickery (see *Capturing Touches*), ScrollView receives touch responder status _before_
other views; further, it doesn't just hand touch responder status to the target view (your view)--
it adds the responder to a stack of touch responders for the touch, so the responders can easily
return to their parent responder (which is what you do with the above line of code.)

Remember, though, that touchesDragged is called with a set of touches. It is really easy
to change the responder for all of the touches simultaneously, should you wish to do so:

    #js
    touches.forEach(function(touch){
      touch.makeTouchResponder(touch.nextTouchResponder);
    });

Perhaps you want to pass control only if the responder is scrollable:

    #js
    if (touch.nextTouchResponder && touch.nextTouchResponder.isScrollable) {
    	touch.makeTouchResponder(touch.nextTouchResponder);
    }

`#js:touchCancelled` will be called on your view automatically.

What Does It Look Like?
-----------------------
In this example, there is a single white box, containing a gray inner box. When you press
on the inner box, the outer box will capture the touch first. After a delay, it re-captures
by calling captureTouch, and the inner view receives it. This is just like the "Capturing" demo.

However, the inner view, after a second, will release it back.

{{demo:sc|releasing.js}}
