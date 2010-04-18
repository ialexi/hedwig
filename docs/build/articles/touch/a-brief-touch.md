{
  "any":    "metadata",
  "goes":   "Here",
  "damn":   "gruber",
  "this":   "is still eye-readable",
  "and":    "He is wrong about touch apps."
}

A Brief Touch
=============

It is very possible to build _awesome_ touch-enabled applications in SproutCore.

But, what makes an awesome touch-enabled application? Sure, it must accept touches,
but with SproutCore's (constantly growing) touch support, this is now pretty easy:
many existing interfaces, if built with newer SproutCore varieties, will function fine (or mostly fine),
on both larger-screened touch devices (such as iPad) and the traditional desktop environment.

But there are many differences between desktop and touch platforms:

- **Precision.** Touches are less precise than clicks. To compensate, controls should be larger.
- **Performance.** Touch-based devices tend to be slow (for now). To get around this just takes 
  some elbow grease: there are many techniques to speed things up... many of which SproutCore will
  handle for you.
- **Animation.** Lack of animation looks okay on desktop (even if animation is cool)... but on
  touch devices, non-animated interfaces look strange: touch is so much more realistic than mouse,
  but sudden changes without transitions are not realistic at all.
- **Coolness.** Touch-based interfaces are cool. That is all.

In this guide, we go over each of these, except for the last, which is rather vague; you'll have to figure out
your own meaning of "coolness".
