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

            @currentPage = newState

            if newState is "GALLERY"
                @pages.BACKGROUND.unrender()
            else
                @pages.BACKGROUND.render()

            super(event, oldState, newState)


        onResize: =>
            @pages[@currentPage].onResize() if @currentPage

        animate: =>
            @pages[@currentPage].animate() if @currentPage

        playIntro: =>
            @pages[@currentPage].playIntro() if @currentPage

        # DESKTOP

        onMouseDown: (e) =>
            @pages[@currentPage].onMouseDown(e) if @currentPage

        onMouseMove: (e) =>
            @pages[@currentPage].onMouseMove(e) if @currentPage

        onMouseUp: (e) =>
            @pages[@currentPage].onMouseUp(e) if @currentPage

        # MOBILE

        onTouchStart: (e) =>
            @pages[@currentPage].onTouchStart(e) if @currentPage

        onTouchMove: (e) =>
            @pages[@currentPage].onTouchMove(e) if @currentPage

        onTouchEnd: (e) =>
            @pages[@currentPage].onTouchEnd(e) if @currentPage







