/*global Hedwig*/
Hedwig.TouchHelper = {
  /**
    touchGestures: Gestures dealing with single touches.
  */
  touchGestures: {
    "tap": { minX: 0, maxX: 3 },
    "drag": {minX: 5, maxX: 50},
    "swipe": { minX: 50 },
    "RELEASE": { minY: 30 }
  },

  captureTouch: function() {
    return YES;
  },

  /**
    Maps a delta to gestures
  */
  mapDelta: function(deltaX, deltaY) {
    var key, gesture, gestures = this.get("touchGestures"), inGesture;
    var ret = {};

    // loop through and evaluate
    for (key in gestures) {
      gesture = this.touchGestures[key]; inGesture = YES;

      if ("minX" in gesture && deltaX < gesture.minX) inGesture = NO;
      if ("minY" in gesture && deltaY < gesture.minY) inGesture = NO;
      if ("maxX" in gesture && deltaX > gesture.maxX) inGesture = NO;
      if ("maxY" in gesture && deltaY > gesture.maxY) inGesture = NO;

      ret[key] = inGesture;
    }

    return ret;
  },

  /**
    Finds out what gestures this touch could qualify for
  */
  mapTouch: function(touch) {
    // calculate deltaX/Y (should we cache our own versions, by any chance?)
    var deltaX = Math.abs(touch.pageX - touch.startX),
        deltaY = Math.abs(touch.pageY - touch.startY);

    return this.mapDelta(deltaX, deltaY);
  }
};