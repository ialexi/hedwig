Capturing
==========
There are many instances where you may have to capture touches. We'll consider scroll views,
however, because it is very easy to explain _why_ they need to be able to.

If you are implementing a scroll view, you'll need to capture the touch before the target view gets it.

This is because scroll views have some subtle quirks. For instance, a touch should not pass
through to the actual target until a split-second has passed—this is to prevent flicker should
the user decide to scroll rather than touch the target. Also, it needs to add itself to what is
called the "touch responder stack" _before_ the target view, so that the target view can hand control back
simply as discussed above.

Touch Responder Stack
-----------------------
Very briefly mentioned in the "Touch Events" article, the _touch responder_ is the view which
"owns" a touch—the view which gets all touchesDragged events and the touchEnd for that touch.

However, in our scroll view case, we want to pass control to the target view, but allow it
to _transfer control back_ (a process covered in "Releasing"). That means it needs to know
what view to hand it back to. Also, what if you had a scroll view _within_ a scroll view?

To solve these issues, there is a "stack" of those views to which control can be passed back to.

You generally work with it by either:

- Specifically telling it to "stack" your view when capturing a touch.
- Telling it to change touch responder to a touch responder in the stack (see Releasing)

Capturing
---------
Capturing the touch is simple. Before starting at the target view and working its
way up to the root calling touchStart (the same way all SproutCore events work), 
SproutCore's touch events go the opposite direction, starting at the root and working their way down
to the target, calling a method named captureTouch:

    #js
    captureTouch: function(touch) {

If the view returns YES, the touchStart event will be sent directly to it.

You could then use invokeLater to wait that split-second. But then what? You don't actually
know what the target view should be. What you need is to start at the original target, and
do the whole working up to it calling captureTouch and work down from it calling touchStart
thing—but this time, starting from your own view, rather than the root. 

Thankfully, you can do this in one line of code:

    #js
    touch.captureTouch(this, YES); // the YES means stack, which I'm guessing you'd want to do
    // so that the new view can easily pass control back to this...
    // ... but you may know better than me.

What happens next depends on whether or not you told it to stack your view:

- If stacked, you will receive a touchCancelled when the touch actually ends, unless the
  view which captures the touch hands control back to your view. If it does, you will _not_
  receive another `#js:touchStart`, but you _will_ start receiving `#js:touchesDragged` and 
  will receive a `#js:touchEnd` when the touch ends.
- If not stacked, your view will receive `#js:touchCancelled`.

What Does It Look Like?
-----------------------
In this example, we have two boxes, each containing an inner box. The outer boxes
capture touches, and only pass them to the inner box after a delay. The top box stacks,
the other one does not; this causes, as described above, a difference in when touchEnd/Cancelled
is called on the outer boxes.

{{demo:sc|capturing.js}}


