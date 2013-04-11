define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'controllers/AppState'
    ], (
    $
    _b
    _u
    AppState
    ) ->

    class AppRouter extends Backbone.Router

        @EVENT_HASH_CHANGED         : 'EVENT_HASH_CHANGED'

        routes:

            ':id/:subid'            : 'hashChanged'
            '/:id/:subid'           : 'hashChanged'

            ':id/:subid/'           : 'hashChanged'
            '/:id/:subid/'          : 'hashChanged'

            '*actions'              : 'default'


        start: ->
            Backbone.history.start()

        hashChanged: (subid, id) =>

            AppState.isIntro = false unless subid is "thumbnails"

            @trigger AppRouter.EVENT_HASH_CHANGED, subid, id

        default: (actions) ->
            unless actions?
                @navigate "thumbnails/0"