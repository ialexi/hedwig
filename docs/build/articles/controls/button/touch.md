ButtonView Touch Support
========================
ButtonView currently supports only a single touch (any other touches will be ignored). 
This is fine: why would you want to consider two touches in a button press?

However, it does not simply relay the touches to `#js:mouseDown` and `#js:mouseUp`.

Instead, it calculates the distance of the main touch (`#js:evt`'s `#js:pageX` and `#js:pageY`)
from the button itself. This makes it easier to for a user to press a button while, for instance,
moving their finger.

This is all done for you automatically. Here's a simple demo:
{{demo:sc|touch-button.js}}

Ace 2.0
--------
Ace 2.0 supports several button sizes. In addition, it is capable of _automatically picking_
a size based on the size of your control. And best of all, it _centers_ the button image
vertically in the space you allocate. This allows you to, for instance, make a button 44px
tall, but have the image only be 30px.

You may use these options for `#js:controlSize`:

- SC.SMALL\_CONTROL\_SIZE. 18px.
- SC.REGULAR\_CONTROL\_SIZE. 24px.
- SC.HUGE\_CONTROL\_SIZE. 30px.
- SC.JUMBO\_CONTROL\_SIZE. 44px.
- SC.AUTO\_CONTROL\_SIZE. Automatically figures a control size (largest that will fit), but
  throws a warning if you don't have "height" set and it has to calculate the size.
- SC.CALCULATED\_CONTROL\_SIZE. Like AUTO\_CONTROL\_SIZE, but calculates it.

{{demo:sc|button-size.js}}