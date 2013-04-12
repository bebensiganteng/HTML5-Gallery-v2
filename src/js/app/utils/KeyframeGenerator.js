(function() {
  define(['jquery', 'libs/backbone', 'libs/underscore'], function($, _b, _u) {
    var KeyframeGenerator;

    return KeyframeGenerator = (function() {
      function KeyframeGenerator() {}

      KeyframeGenerator.add = function() {
        return " @-moz-keyframes fly \n{\n    0%{\n        -webkit-transform:translateX(0);\n        -moz-transform:translateX(0);\n        -o-transform:translateX(0);\n        -ms-transform:translateX(0);\n        transform:translateX(0);\n\n        -webkit-transform:translateY(0);\n        -moz-transform:translateY(0);\n        -o-transform:translateY(0);\n        -ms-transform:translateY(0);\n        transform:translateY(0);\n\n        -webkit-transform:translateZ(-200px);\n        -moz-transform:translateZ(-200px);\n        -o-transform:translateZ(-200px);\n        -ms-transform:translateZ(-200px);\n        transform:translateZ(-200px);\n\n        opacity:0;\n        filter:alpha(opacity=0);\n        -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"\n    }\n\n    10%{\n        opacity:1;\n        -ms-filter:none;\n        filter:none\n    }\n\n    90%{\n        opacity:1;\n        -ms-filter:none;\n        filter:none\n    }\n\n    100%{\n        -webkit-transform:translateX(0);\n        -moz-transform:translateX(0);\n        -o-transform:translateX(0);\n        -ms-transform:translateX(0);\n        transform:translateX(0);\n        -webkit-transform:translateY(0);\n        -moz-transform:translateY(0);\n        -o-transform:translateY(0);\n        -ms-transform:translateY(0);\n        transform:translateY(0);\n        -webkit-transform:translateZ(100px);\n        -moz-transform:translateZ(100px);\n        -o-transform:translateZ(100px);\n        -ms-transform:translateZ(100px);\n        transform:translateZ(100px);\n        opacity:0;filter:alpha(opacity=0);\n        -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"\n    }\n}\n\n@-webkit-keyframes fly{\n\n    0%{\n        -webkit-transform:translateX(0);\n        -moz-transform:translateX(0);\n        -o-transform:translateX(0);\n        -ms-transform:translateX(0);\n        transform:translateX(0);\n\n        -webkit-transform:translateY(0);\n        -moz-transform:translateY(0);\n        -o-transform:translateY(0);\n        -ms-transform:translateY(0);\n        transform:translateY(0);\n\n        -webkit-transform:translateZ(-200px);\n        -moz-transform:translateZ(-200px);\n        -o-transform:translateZ(-200px);\n        -ms-transform:translateZ(-200px);\n        transform:translateZ(-200px);\n\n        opacity:0;filter:alpha(opacity=0);\n        -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"\n    }\n\n    10%{opacity:1;-ms-filter:none;filter:none}\n\n    90%{opacity:1;-ms-filter:none;filter:none}\n\n    100%{\n        -webkit-transform:translateX(0);\n        -moz-transform:translateX(0);\n        -o-transform:translateX(0);\n        -ms-transform:translateX(0);\n        transform:translateX(0);\n        -webkit-transform:translateY(0);\n        -moz-transform:translateY(0);\n        -o-transform:translateY(0);\n        -ms-transform:translateY(0);\n        transform:translateY(0);\n        -webkit-transform:translateZ(100px);\n        -moz-transform:translateZ(100px);\n        -o-transform:translateZ(100px);\n        -ms-transform:translateZ(100px);\n        transform:translateZ(100px);\n        opacity:0;filter:alpha(opacity=0);\n        -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"\n    }\n}\n\n@-o-keyframes fly{\n    0%{\n        -webkit-transform:translateX(0);\n        -moz-transform:translateX(0);\n        -o-transform:translateX(0);\n        -ms-transform:translateX(0);\n        transform:translateX(0);\n        -webkit-transform:translateY(0);\n        -moz-transform:translateY(0);\n        -o-transform:translateY(0);\n        -ms-transform:translateY(0);\n        transform:translateY(0);\n        -webkit-transform:translateZ(-200px);\n        -moz-transform:translateZ(-200px);\n        -o-transform:translateZ(-200px);\n        -ms-transform:translateZ(-200px);\n        transform:translateZ(-200px);\n        opacity:0;filter:alpha(opacity=0);\n        -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"\n    }\n\n    10%{opacity:1;-ms-filter:none;filter:none}\n\n    90%{opacity:1;-ms-filter:none;filter:none}\n\n    100%{\n        -webkit-transform:translateX(0);\n        -moz-transform:translateX(0);\n        -o-transform:translateX(0);\n        -ms-transform:translateX(0);\n        transform:translateX(0);\n        -webkit-transform:translateY(0);\n        -moz-transform:translateY(0);\n        -o-transform:translateY(0);\n        -ms-transform:translateY(0);\n        transform:translateY(0);\n        -webkit-transform:translateZ(100px);\n        -moz-transform:translateZ(100px);\n        -o-transform:translateZ(100px);\n        -ms-transform:translateZ(100px);\n        transform:translateZ(100px);\n        opacity:0;\n        filter:alpha(opacity=0);\n        -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"\n    }\n}\n\n@-ms-keyframes fly{\n    0%{\n        -webkit-transform:translateX(0);\n        -moz-transform:translateX(0);\n        -o-transform:translateX(0);\n        -ms-transform:translateX(0);\n        transform:translateX(0);\n        -webkit-transform:translateY(0);\n        -moz-transform:translateY(0);\n        -o-transform:translateY(0);\n        -ms-transform:translateY(0);\n        transform:translateY(0);\n        -webkit-transform:translateZ(-200px);\n        -moz-transform:translateZ(-200px);\n        -o-transform:translateZ(-200px);\n        -ms-transform:translateZ(-200px);\n        transform:translateZ(-200px);\n        opacity:0;filter:alpha(opacity=0);\n        -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"\n    }\n\n    10%{opacity:1;-ms-filter:none;filter:none}\n\n    90%{opacity:1;-ms-filter:none;filter:none}\n\n    100%{\n        -webkit-transform:translateX(0);\n        -moz-transform:translateX(0);\n        -o-transform:translateX(0);\n        -ms-transform:translateX(0);\n        transform:translateX(0);\n        -webkit-transform:translateY(0);\n        -moz-transform:translateY(0);\n        -o-transform:translateY(0);\n        -ms-transform:translateY(0);\n        transform:translateY(0);\n        -webkit-transform:translateZ(100px);\n        -moz-transform:translateZ(100px);\n        -o-transform:translateZ(100px);\n        -ms-transform:translateZ(100px);\n        transform:translateZ(100px);\n        opacity:0;filter:alpha(opacity=0);\n        -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"\n    }\n}\n\n@keyframes fly{\n    0%{\n        -webkit-transform:translateX(0);\n        -moz-transform:translateX(0);\n        -o-transform:translateX(0);\n        -ms-transform:translateX(0);\n        transform:translateX(0);\n        -webkit-transform:translateY(0);\n        -moz-transform:translateY(0);\n        -o-transform:translateY(0);\n        -ms-transform:translateY(0);\n        transform:translateY(0);\n        -webkit-transform:translateZ(-200px);\n        -moz-transform:translateZ(-200px);\n        -o-transform:translateZ(-200px);\n        -ms-transform:translateZ(-200px);\n        transform:translateZ(-200px);\n        opacity:0;filter:alpha(opacity=0);\n        -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"\n    }\n\n    10%{\n        opacity:1;\n        -ms-filter:none;\n        filter:none\n    }\n\n    90%{\n        opacity:1;\n        -ms-filter:none;\n        filter:none\n    }\n\n    100%{\n        -webkit-transform:translateX(0);\n        -moz-transform:translateX(0);\n        -o-transform:translateX(0);\n        -ms-transform:translateX(0);\n        transform:translateX(0);\n        -webkit-transform:translateY(0);\n        -moz-transform:translateY(0);\n        -o-transform:translateY(0);\n        -ms-transform:translateY(0);\n        transform:translateY(0);\n        -webkit-transform:translateZ(100px);\n        -moz-transform:translateZ(100px);\n        -o-transform:translateZ(100px);\n        -ms-transform:translateZ(100px);\n        transform:translateZ(100px);\n        opacity:0;filter:alpha(opacity=0);\n        -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"\n    }\n}";
      };

      return KeyframeGenerator;

    }).call(this);
  });

}).call(this);