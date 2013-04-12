define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    'views/desktop/component/CloudView'
    'controllers/AppState'
    ], (
    $
    _b
    _u
    PageView
    CloudView
    AppState
    ) ->

    class BackgroundView extends PageView

        @INTRO_COMPLETE: 'INTRO_COMPLETE'

        numClouds: 50

        initialize: ->
            _.bindAll @, 'render', 'unrender'

            @cloudContainer = $("#background-clouds")
            @rainContainer  = $("#background-rain")

            @render()

        render: (@ids) =>

            super(@ids)

            list = []
            @clouds = []

            for i in [0..@numClouds]

                cloud = new CloudView()

                list.push cloud.built(i)
                @clouds.push cloud

            @cloudContainer.append list.join ""

            @onResize()

        onResize: =>
            super()

            _.each @clouds, (obj) =>
                obj.onResize()
                obj.setPositions()

        playIntro: =>
            console.log "BackgroundView.playIntro:", AppState.isIntro

        animate: =>
            _.each @clouds, (obj) => obj.animate()