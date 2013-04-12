define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    'views/desktop/pages/ThumbnailsView'
    'views/desktop/pages/GalleryView'
    'views/desktop/pages/BackgroundView'
    ], (
    $
    _b
    _u
    PageView
    ThumbnailsView
    GalleryView
    BackgroundView
    ) ->

    class DesktopView extends PageView

        initialize: ->
            _.bindAll @, 'render'

            @render()

        render: =>
            @pages =
                THUMBNAILS: new ThumbnailsView
                    el: @el
                    json: @options.json

                GALLERY: new GalleryView
                    el: @el
                    json: @options.json

                BACKGROUND: new BackgroundView()

        updatePage: =>
            _.each @pages, (obj) -> obj.updatePage()

        setIds: (@ids) =>
            _.each @pages, (obj) => obj.setIds @ids

        onStateChange: (event, oldState, newState) =>
            super(event, oldState, newState)

        onResize: =>
            super()
            _.each @pages, (obj) -> obj.onResize()

        animate: =>
            super()
            _.each @pages, (obj) -> obj.animate()

        playIntro: =>
            _.each @pages, (obj) -> obj.playIntro()

        # DESKTOP

        onMouseDown: (e) =>
            _.each @pages, (obj) -> obj.onMouseDown(e)

        onMouseMove: (e) =>
            _.each @pages, (obj) -> obj.onMouseMove(e)

        onMouseUp: (e) =>
            _.each @pages, (obj) -> obj.onMouseUp(e)

        # MOBILE

        onTouchStart: (e) =>
            _.each @pages, (obj) -> obj.onTouchStart(e)

        onTouchMove: (e) =>
            _.each @pages, (obj) -> obj.onTouchMove(e)

        onTouchEnd: (e) =>
            _.each @pages, (obj) -> obj.onTouchEnd(e)







