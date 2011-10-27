require("src/paper/paper");
/*global Paper Pig*/
Pig.IconTheme = Pig.Paper.subtheme("icon", "icon");
Pig.IconTheme.renderers.Button = Pig.renderers.Button.extend({
  renderContents: function(context) {
    if (!this.imageRenderer) this.imageRenderer = this.theme.image();
    this.imageRenderer.attr('src', this.icon);

    context = context.begin("img");
    this.imageRenderer.render(context);
    context = context.end();
  },
  updateContents: function(){
    this.imageRenderer.attr('src', this.icon);
    this.imageRenderer.update();
  },
  didAttachLayer: function(l){
    SC.AceTheme.renderers.Button.didAttachLayer.call(this, l);
    this.imageRenderer.attachLayer(this.provide("img"));
  },
  didDetachLayer: function(){
    SC.AceTheme.renderers.Button.didDetachLayer.call(this);
    this.imageRenderer.detachLayer();
  }
});

Pig.IconTheme.renderers.button = Pig.IconTheme.renderers.Button.create();