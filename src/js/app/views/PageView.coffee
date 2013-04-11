define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'libs/jquery.transit'
    # 'libs/jquery.lazyload'
    ], (
    $
    _b
    _u
    transit
    # _l
    ) ->

    class PageView extends Backbone.View

        pages: null

        width: null
        height: null

        initialize: ->
            _.bindAll @, 'render', 'unrender'

            # this thing doesnt work
            #$("img").lazyload effect: "fadeIn"

        unrender: =>
            $(@el).transition
                opacity: 0
            , 500, 'ease-in-out', -> $(@).children().first().remove()

        render: (@ids) =>
            $(@el).css(opacity:0)

            $(@el).transition
                opacity: 1
            , 500, 'ease-in-out'

        # PUBLIC

        onStateChange: (event, oldState, newState) =>
            return if oldState is newState

            console.log "PageView.onStateChange:", event, "old:", oldState, "new:", newState

            @pages[oldState]?.unrender?()
            @pages[newState]?.render?(@ids)

        # This may not necessary, depending on your site design
        updatePage: =>
            console.log "PageView.updatePage"

        animate: =>
            #console.log 'PageView.animate'

        onResize: =>
            @width  = $(window).outerWidth()
            @height = $(window).outerHeight()

        setIds: (@ids) =>

        # INTERACTION

        setDesktopInteraction: =>

            $(document).on 'mousedown', @onMouseDown
            $(document).on "mousemove", @onMouseMove
            $(document).on "mouseup", @onMouseUp

            return @

        setMobileInteraction: =>

            $(document)[0].addEventListener "touchstart", @onTouchStart, true
            $(document)[0].addEventListener "touchmove", @onTouchMove, true
            $(document)[0].addEventListener "touchend", @onTouchEnd, true

            return @

        # DESKTOP

        onMouseDown: (e) =>

        onMouseMove: (e) =>

        onMouseUp: (e) =>

        # MOBILE

        onTouchStart: (e) =>

        onTouchMove: (e) =>

        onTouchEnd: (e) =>

        #CSS3

        transform: (elem, x, y, z = 0, r = 0, s = 1) =>

            elem.style['-webkit-transform'] = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotate(' + r + 'deg) scale(' + s + ')';
            # elem.style['-moz-transform'] = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotate(' + r + 'deg) scale(' + s + ')';
            # elem.style['-o-transform'] = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotate(' + r + 'deg) scale(' + s + ')';
            # elem.style['-ms-transform'] = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotate(' + r + 'deg) scale(' + s + ')';
            # elem.style['transform'] = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotate(' + r + 'deg) scale(' + s + ')';