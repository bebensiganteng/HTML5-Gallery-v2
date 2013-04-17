define [
    'jquery'
    'libs/jquery.keyframes'
    ], (
    $
    _k
    ) ->

    class AppState

        @STATE_READY    : 'STATE_READY'

        @isTablet       : (/ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase()))
        @isMobile       : (/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase()))
        @isDesktop      : false

        @isPaused       : false
        @isIntro        : true

        @browser        : $.keyframe.browserCode()

        constructor : ->

            AppState.isDesktop = not AppState.isTablet and not AppState.isMobile

            @html = $ 'html'
            
            # @setMobile() if AppState.isMobile or AppState.isTablet
            # @setDesktop() if AppState.isDesktop

            # Depends on the design set it to mobile or desktop
            @setDesktop()

        setDesktop: =>
            @html.addClass 'desktop'

            # Not actually necessary
            # if /MSIE/.test navigator.userAgent
            #     $html.addClass( 'ie' )

            # test  = new RegExp "MSIE ([0-9]{1,}[\.0-9]{0,})"

            # if test.exec navigator.userAgent
            #     ieVersion = parseFloat RegExp.$1
            #     @html.addClass 'ie-' + ieVersion

            #     if ieVersion <= 8
            #         @html.addClass 'old-ie'
            #     else
            #         @html.addClass 'new-ie'
            # else
            #     @html.addClass( 'non-ie' )

        setMobile: =>
            @html.addClass 'mobile'

        # http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
        @has3d: =>
            el = document.createElement("p")
            has3d = undefined
            transforms =
                webkitTransform: "-webkit-transform"
                OTransform: "-o-transform"
                msTransform: "-ms-transform"
                MozTransform: "-moz-transform"
                transform: "transform"

            # Add it to the body to get the computed style.
            document.body.insertBefore el, null
            for t of transforms
                if el.style[t] isnt `undefined`
                    el.style[t] = "translate3d(1px,1px,1px)"
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t])

            document.body.removeChild el
            return has3d isnt `undefined` and has3d.length > 0 and has3d isnt "none"

