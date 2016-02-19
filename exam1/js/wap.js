var releaseVer = 't='+Math.random();

define(function(require, exports) {
  var init = function(filename) {
    require("jquery");
    var mods = filename.split(',');
    var modName;
    for(var i in mods){
      modName = mods[i];
      if (modName) {
        require.async('./dist/' + modName + '.js?t='+releaseVer, function(mod) {
          if (mod && mod.init) {
            mod.init();
          }
        });
      }
    }
  };
  exports.init = init;
});
(function(){
  var alias = {
    'jquery':'core/jquery-2.1.1.min',

    //ui

    'jMinEmoji':'public/ui/jMinEmoji/factory',
    'jMinEmojiCss':'public/ui/jMinEmoji/css/minEmoji.css',
    //util
    'mustache':'public/util/mustache/factory',
    'uri':'public/util/uri/factory',
    'easing':'public/util/easing/factory',
    'uploader':'public/util/uploader/factory',
    'jvForm':'public/util/jvForm/factory',
    'moment':'public/util/moment/factory',
    'juicer': 'public/util/juicer/factory',
    'fastclick': 'public/util/fastclick/factory',
    'highcharts':'public/ui/highcharts/factory',
    'highcharts-wap':'public/ui/highcharts-wap/factory',
    'touchJs': 'public/util/touchJs/factory',
    //common
    'location': 'dist/util/location',
    'locationV2': 'dist/util/location_v2',
    'ui':'dist/ui.js',
    'store-ui': 'dist/store/common'
  };


  seajs.config({
    alias: alias,
    base: './js/',
    map: [
       [/^(.*\/js\/(.*)\/.*\.(?:css|js))(?:.*)$/i, '$1?'+releaseVer]
    ]
  });
})();
