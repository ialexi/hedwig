# ===========================================================================
# Project:   Hedwig
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, "sproutcore/animation", "sproutcore/forms"], :theme=>:pig, :url_prefix => "/static/hedwig/",
  :html5_manifest=> true,
  :layout => 'lib/index.rhtml'
