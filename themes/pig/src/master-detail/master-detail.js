/*global Pig*/
require("pig");
Pig.renderers.MasterDetail = SC.EmptyTheme.renderers.MasterDetail.extend({
  BORDER: 0
});

Pig.renderers.masterDetail = Pig.renderers.MasterDetail.create();