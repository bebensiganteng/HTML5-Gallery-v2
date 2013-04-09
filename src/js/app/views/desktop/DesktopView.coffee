define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    'views/desktop/pages/ThumbnailsView'
    'views/desktop/pages/GalleryView'
    ], (
    $
    _b
    _u
    PageView
    ThumbnailsView
    GalleryView
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

        onStateChange: (event, oldState, newState) =>
            super(event, oldState, newState)







