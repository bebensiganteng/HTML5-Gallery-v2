define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    ], (
    $
    _b
    _u
    ) ->

   	#TODO: create a real function class for this
    class KeyframeGenerator

    	@add: => 
    		""" @-moz-keyframes fly 
                {
                    0%{
                        -webkit-transform:translateX(0);
                        -moz-transform:translateX(0);
                        -o-transform:translateX(0);
                        -ms-transform:translateX(0);
                        transform:translateX(0);

                        -webkit-transform:translateY(0);
                        -moz-transform:translateY(0);
                        -o-transform:translateY(0);
                        -ms-transform:translateY(0);
                        transform:translateY(0);

                        -webkit-transform:translateZ(-200px);
                        -moz-transform:translateZ(-200px);
                        -o-transform:translateZ(-200px);
                        -ms-transform:translateZ(-200px);
                        transform:translateZ(-200px);

                        opacity:0;
                        filter:alpha(opacity=0);
                        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    }
                
                    10%{
                        opacity:1;
                        -ms-filter:none;
                        filter:none
                    }

                    90%{
                        opacity:1;
                        -ms-filter:none;
                        filter:none
                    }
                
                    100%{
                        -webkit-transform:translateX(0);
                        -moz-transform:translateX(0);
                        -o-transform:translateX(0);
                        -ms-transform:translateX(0);
                        transform:translateX(0);
                        -webkit-transform:translateY(0);
                        -moz-transform:translateY(0);
                        -o-transform:translateY(0);
                        -ms-transform:translateY(0);
                        transform:translateY(0);
                        -webkit-transform:translateZ(100px);
                        -moz-transform:translateZ(100px);
                        -o-transform:translateZ(100px);
                        -ms-transform:translateZ(100px);
                        transform:translateZ(100px);
                        opacity:0;filter:alpha(opacity=0);
                        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    }
                }

                @-webkit-keyframes fly{

                    0%{
                        -webkit-transform:translateX(0);
                        -moz-transform:translateX(0);
                        -o-transform:translateX(0);
                        -ms-transform:translateX(0);
                        transform:translateX(0);

                        -webkit-transform:translateY(0);
                        -moz-transform:translateY(0);
                        -o-transform:translateY(0);
                        -ms-transform:translateY(0);
                        transform:translateY(0);

                        -webkit-transform:translateZ(-200px);
                        -moz-transform:translateZ(-200px);
                        -o-transform:translateZ(-200px);
                        -ms-transform:translateZ(-200px);
                        transform:translateZ(-200px);

                        opacity:0;filter:alpha(opacity=0);
                        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    }
                
                    10%{opacity:1;-ms-filter:none;filter:none}
                
                    90%{opacity:1;-ms-filter:none;filter:none}
                
                    100%{
                        -webkit-transform:translateX(0);
                        -moz-transform:translateX(0);
                        -o-transform:translateX(0);
                        -ms-transform:translateX(0);
                        transform:translateX(0);
                        -webkit-transform:translateY(0);
                        -moz-transform:translateY(0);
                        -o-transform:translateY(0);
                        -ms-transform:translateY(0);
                        transform:translateY(0);
                        -webkit-transform:translateZ(100px);
                        -moz-transform:translateZ(100px);
                        -o-transform:translateZ(100px);
                        -ms-transform:translateZ(100px);
                        transform:translateZ(100px);
                        opacity:0;filter:alpha(opacity=0);
                        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    }
                }

                @-o-keyframes fly{
                    0%{
                        -webkit-transform:translateX(0);
                        -moz-transform:translateX(0);
                        -o-transform:translateX(0);
                        -ms-transform:translateX(0);
                        transform:translateX(0);
                        -webkit-transform:translateY(0);
                        -moz-transform:translateY(0);
                        -o-transform:translateY(0);
                        -ms-transform:translateY(0);
                        transform:translateY(0);
                        -webkit-transform:translateZ(-200px);
                        -moz-transform:translateZ(-200px);
                        -o-transform:translateZ(-200px);
                        -ms-transform:translateZ(-200px);
                        transform:translateZ(-200px);
                        opacity:0;filter:alpha(opacity=0);
                        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    }

                    10%{opacity:1;-ms-filter:none;filter:none}
                
                    90%{opacity:1;-ms-filter:none;filter:none}
                
                    100%{
                        -webkit-transform:translateX(0);
                        -moz-transform:translateX(0);
                        -o-transform:translateX(0);
                        -ms-transform:translateX(0);
                        transform:translateX(0);
                        -webkit-transform:translateY(0);
                        -moz-transform:translateY(0);
                        -o-transform:translateY(0);
                        -ms-transform:translateY(0);
                        transform:translateY(0);
                        -webkit-transform:translateZ(100px);
                        -moz-transform:translateZ(100px);
                        -o-transform:translateZ(100px);
                        -ms-transform:translateZ(100px);
                        transform:translateZ(100px);
                        opacity:0;
                        filter:alpha(opacity=0);
                        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    }
                }

                @-ms-keyframes fly{
                    0%{
                        -webkit-transform:translateX(0);
                        -moz-transform:translateX(0);
                        -o-transform:translateX(0);
                        -ms-transform:translateX(0);
                        transform:translateX(0);
                        -webkit-transform:translateY(0);
                        -moz-transform:translateY(0);
                        -o-transform:translateY(0);
                        -ms-transform:translateY(0);
                        transform:translateY(0);
                        -webkit-transform:translateZ(-200px);
                        -moz-transform:translateZ(-200px);
                        -o-transform:translateZ(-200px);
                        -ms-transform:translateZ(-200px);
                        transform:translateZ(-200px);
                        opacity:0;filter:alpha(opacity=0);
                        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    }
                
                    10%{opacity:1;-ms-filter:none;filter:none}
                
                    90%{opacity:1;-ms-filter:none;filter:none}
                
                    100%{
                        -webkit-transform:translateX(0);
                        -moz-transform:translateX(0);
                        -o-transform:translateX(0);
                        -ms-transform:translateX(0);
                        transform:translateX(0);
                        -webkit-transform:translateY(0);
                        -moz-transform:translateY(0);
                        -o-transform:translateY(0);
                        -ms-transform:translateY(0);
                        transform:translateY(0);
                        -webkit-transform:translateZ(100px);
                        -moz-transform:translateZ(100px);
                        -o-transform:translateZ(100px);
                        -ms-transform:translateZ(100px);
                        transform:translateZ(100px);
                        opacity:0;filter:alpha(opacity=0);
                        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    }
                }

                @keyframes fly{
                    0%{
                        -webkit-transform:translateX(0);
                        -moz-transform:translateX(0);
                        -o-transform:translateX(0);
                        -ms-transform:translateX(0);
                        transform:translateX(0);
                        -webkit-transform:translateY(0);
                        -moz-transform:translateY(0);
                        -o-transform:translateY(0);
                        -ms-transform:translateY(0);
                        transform:translateY(0);
                        -webkit-transform:translateZ(-200px);
                        -moz-transform:translateZ(-200px);
                        -o-transform:translateZ(-200px);
                        -ms-transform:translateZ(-200px);
                        transform:translateZ(-200px);
                        opacity:0;filter:alpha(opacity=0);
                        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    }
                
                    10%{
                        opacity:1;
                        -ms-filter:none;
                        filter:none
                    }
                
                    90%{
                        opacity:1;
                        -ms-filter:none;
                        filter:none
                    }
                
                    100%{
                        -webkit-transform:translateX(0);
                        -moz-transform:translateX(0);
                        -o-transform:translateX(0);
                        -ms-transform:translateX(0);
                        transform:translateX(0);
                        -webkit-transform:translateY(0);
                        -moz-transform:translateY(0);
                        -o-transform:translateY(0);
                        -ms-transform:translateY(0);
                        transform:translateY(0);
                        -webkit-transform:translateZ(100px);
                        -moz-transform:translateZ(100px);
                        -o-transform:translateZ(100px);
                        -ms-transform:translateZ(100px);
                        transform:translateZ(100px);
                        opacity:0;filter:alpha(opacity=0);
                        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    }
                }
            """