define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    ], (
    $
    _b
    _u
    ) ->

    class GalleryView extends Backbone.View

        initialize: ->
            _.bindAll @, 'render'

            console.log "GalleryView.initialize"

        show: ->

        hide: ->



