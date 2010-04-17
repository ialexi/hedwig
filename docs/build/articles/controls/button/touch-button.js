var MyExampleView = SC.View.extend({
  backgroundColor: "white",
  childViews: "button".w(),
  button: SC.ButtonView.design({
    layout: { centerX: 0, centerY: 0, width: 200, height: 44 },
    title: "Tap Here :)",
    controlSize: SC.AUTO_CONTROL_SIZE
  })
});

// bootstrap code :)
exports.getDemoView = function() {
  return MyExampleView;
};
