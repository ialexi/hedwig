require("pig");
/*global Pig*/
Pig.ChromelessTheme = Pig.subtheme("chromeless", "chromeless");
Pig.ChromelessTheme.renderers.Button = SC.AceTheme.renderers.Button.extend({
  renderContents: function(context) {
    context = context.begin("label");
    this._titleRenderer.render(context);
    context = context.end();
  },
  updateContents: function(){
    this._titleRenderer.update();
  }
});

Pig.ChromelessTheme.renderers.button = Pig.ChromelessTheme.renderers.Button.create();