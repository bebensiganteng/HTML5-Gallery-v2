define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'libs/jquery.transit'
    'controllers/appState'
    #'libs/jquery.keyframes'
    # 'libs/jquery.lazyload'
    ], (
    $
    _b
    _u
    transit
    AppState
    #_k
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
            $(@el).children().first().remove()

            # if child
            #     $(child).transition
            #         opacity: 0
            #     , 500, 'ease-in-out', -> $(@).remove()

        render: (@ids) =>
            $(@el).css(opacity:0)

            $(@el).transition
                opacity: 1
            , 500, 'ease-in-out'

        # PUBLIC

        onStateChange: (event, oldState, newState) =>
            return if oldState is newState

            @pages[oldState]?.unrender?()
            @pages[newState]?.render?(@ids)

        # This may not necessary, depending on your site design
        updatePage: =>

        animate: =>

        onResize: =>
            @width  = $(window).outerWidth()
            @height = $(window).outerHeight()

        setIds: (@ids) =>

        playIntro: =>

        # INTERACTION

        setDesktopInteraction: =>

            $(document).on 'mousedown', @onMouseDown
            $(document).on "mousemove", @onMouseMove
            $(document).on "mouseup", @onMouseUp

            return @

        setMobileInteraction: =>

            console.log "PageView.setMobileInteraction"
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

        filter: (elem, p) =>

            elem.style[AppState.browser + 'filter'] = """grayscale(#{p}%)"""

        transform: (elem, x, y, z = 0, r = 0, s = 1) =>

            elem.style[AppState.browser + 'transform'] = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(' + z + 'px) rotate(' + r + 'deg) scale(' + s + ')';