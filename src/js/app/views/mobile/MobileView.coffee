define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    ], (
    $
    _b
    _u
    PageView
    ) ->

    class MobileView extends PageView

        initialize: ->
            _.bindAll @, 'render'

            @render()

        render: =>
            console.log "DesktopView.RENDER"



