define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    'text!templates/desktop/thumbnails.html'
    ], (
    $
    _b
    _u
    PageView
    template
    ) ->

    class ThumbnailsView extends PageView

        json: null

        initialize: ->
            _.bindAll @, 'render', 'unrender'

            @json = @options.json

        render: =>

            # photoid, phototitle, thumb, original
            # TODO: use lazyloaders
            _.each @json, (obj) ->

                console.log "ThumbnailsView.render:", obj

            $(@el).append template

        unrender: =>
            $(@el).remove template



