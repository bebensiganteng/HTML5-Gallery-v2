define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    ], (
    $
    _b
    _u
    ) ->

    class HomeView extends Backbone.View

        initialize: ->
            _.bindAll @, 'render'

            console.log "HomeView.initialize"

        show: ->

        hide: ->



