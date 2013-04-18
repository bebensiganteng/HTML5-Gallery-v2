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

        cssHead: AppState.getCSSTransform()
        has3d: AppState.has3d()

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

            elem.style[@cssHead] = """grayscale(#{p}%)"""

        transform: (elem, x, y, z = 0) =>

            #elem.style[@cssHead + 'transform'] = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotate(' + r + 'deg) scale(' + s + ')';

            if @has3d
                elem.style[@cssHead] = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)'
            else
                elem.style[@cssHead] = 'translate(' + x + 'px, ' + y + 'px)'
            