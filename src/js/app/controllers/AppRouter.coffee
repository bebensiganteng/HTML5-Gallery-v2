define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    ], (
    $
    _b
    _u
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
            @trigger AppRouter.EVENT_HASH_CHANGED, subid, id

        default: (actions) ->
            unless actions?
                @navigate "thumbnails/0"