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

        currentPage: null

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

                BACKGROUND: new BackgroundView
                    el: @el

        updatePage: =>
            @pages[@currentPage].updatePage()

        setIds: (@ids) =>
            _.each @pages, (obj) => obj.setIds @ids
            
        onStateChange: (event, oldState, newState) =>
            super(event, oldState, newState)

            @currentPage = newState

            if newState is "GALLERY"
                @pages.BACKGROUND.unrender()
            else
                @pages.BACKGROUND.render()   


        onResize: =>
            super()
            @pages[@currentPage].onResize()

        animate: =>
            super()
            @pages[@currentPage].animate() if @currentPage

        playIntro: =>
            @pages[@currentPage].playIntro()

        # DESKTOP

        onMouseDown: (e) =>
            @pages[@currentPage].onMouseDown(e)

        onMouseMove: (e) =>
            @pages[@currentPage].onMouseMove(e)

        onMouseUp: (e) =>
            @pages[@currentPage].onMouseUp(e)

        # MOBILE

        onTouchStart: (e) =>
            @pages[@currentPage].onTouchStart(e)

        onTouchMove: (e) =>
            @pages[@currentPage].onTouchMove(e)

        onTouchEnd: (e) =>
            @pages[@currentPage].onTouchEnd(e)







