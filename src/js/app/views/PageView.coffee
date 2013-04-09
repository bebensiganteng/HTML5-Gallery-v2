define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'libs/jquery.transit'
    ], (
    $
    _b
    _u
    transit
    ) ->

    class PageView extends Backbone.View

        pages: null

        initialize: ->
            _.bindAll @, 'render'

        show: =>
            $(@el).transition
                opacity: 0
            , 500, 'ease-in-out', -> $(@).children().first().remove()

        hide: =>
            $(@el).transition
                opacity: 1
            , 500, 'ease-in-out'

        onStateChange: (event, oldState, newState) =>
            return if oldState is newState

            console.log "PageView.onStateChange:", event, "old:", oldState, "new:", newState

            @pages[oldState]?.unrender?()
            @pages[newState]?.render?()

        onResize: =>
