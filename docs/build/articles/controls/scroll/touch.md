ScrollView Touch Support
=========================
SproutCore's ScrollView comes with built-in support for touch-based
scrolling, including momentum and bouncing. In addition, it has (somewhat experimental)
support for scaling.

For many cases, just putting a view inside a ScrollView will "just work". Still, you may want
to set some settings.

Bouncing
----------
By default, ScrollView will _always_ bounce when scrolling vertically, regardless of the
content's height, but only bounce horizontally _if_ the content is wider than the ScrollView.
This is controlled by two properties:

- alwaysBounceHorizontal, which defaults to NO.
- alwaysBounceVertical, which defaults to YES.


Scaling
--------
ScrollView has support for scaling, which you can use through a few properties:

- canScale. Specifies whether the content may be scaled. If YES, using two fingers
  (in that classic "pinch gesture") will zoom the content.
- minimumScale: The minimum scale value. Default: 0.25.
- maximumScale: The maximum scale value. Default: 2.0.


{{demo:sc|touch.js}}
