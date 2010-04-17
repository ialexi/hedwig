/*globals Hedwig*/
var MyExampleView = SC.ScrollView.extend({
  horizontalAlign: SC.ALIGN_CENTER,
  verticalAlign: SC.ALIGN_MIDDLE,
  backgroundColor: "#555",
  
  canScale: YES,
  alwaysBounceVertical: NO,
  
  contentView: SC.ImageView.design({
    layout: { left: 0, top: 0, width: 1357, height: 2048 },
    value: Hedwig.SAMPLE_IMAGE
  })
});

// bootstrap code :)
exports.getDemoView = function() {
  return MyExampleView;
};
