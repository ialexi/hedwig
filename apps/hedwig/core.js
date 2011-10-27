// ==========================================================================
// Project:   Hedwig
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Hedwig */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
Hedwig = SC.Application.create(
  /** @scope Hedwig.prototype */ {

  NAMESPACE: 'Hedwig',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures),

  // THIS IS A HACK BECAUSE DOCS CAN'T HAVE IMAGES YET
  SAMPLE_IMAGE: sc_static("sample_image.jpg")

}) ;
