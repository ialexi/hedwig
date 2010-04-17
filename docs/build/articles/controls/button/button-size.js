var MyExampleView = SC.View.extend({
  backgroundColor: "white",
  childViews: "form".w(),
  
  form: SC.FormView.design({
    layout: {centerX: 0, centerY: 0, width: 400, height: 300 },
    childViews: "small regular huge jumbo".w(),
    small: SC.FormView.row(SC.ButtonView.design({
      layout: { width: 100, height: 18 },
      title: "I'm TINY!",
      controlSize: SC.SMALL_CONTROL_SIZE
    })),
    
    regular: SC.FormView.row(SC.ButtonView.design({
      layout: { width: 100, height: 24 },
      title: "I'm Normal!",
      controlSize: SC.REGULAR_CONTROL_SIZE
    })),
    
    huge: SC.FormView.row(SC.ButtonView.design({
      layout: { width: 100, height: 30 },
      title: "I'm huge.",
      controlSize: SC.HUGE_CONTROL_SIZE
    })),
    
    jumbo: SC.FormView.row(SC.ButtonView.design({
      layout: { width: 150, height: 44 },
      title: "i'm jumbo.",
      controlSize: SC.JUMBO_CONTROL_SIZE
    }))
    
    
  })
});

// bootstrap code :)
exports.getDemoView = function() {
  return MyExampleView;
};
