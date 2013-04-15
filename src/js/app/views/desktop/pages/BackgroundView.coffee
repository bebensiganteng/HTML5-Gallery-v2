define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    'views/desktop/component/CloudView'
    'controllers/AppState'
    'libs/jquery.keyframes'
    ], (
    $
    _b
    _u
    PageView
    CloudView
    AppState
    _k
    ) ->

    class BackgroundView extends PageView

        @INTRO_COMPLETE: 'INTRO_COMPLETE'

        numClouds: 50

        initialize: ->
            _.bindAll @, 'render', 'unrender'

        unrender: =>
            @bg.remove()

        render: (@ids) =>

            super(@ids)

            $(@el).append "<div id='background'>
                <div id='background-clouds'></div>
                <div id='background-rain'></div>
            </div>"

            @bg             = $("#background")
            @cloudContainer = $("#background-clouds")
            @rainContainer  = $("#background-rain")

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

            $.keyframe.removeHead()

            _.each @clouds, (obj) =>
                obj.onResize()
                obj.addKeyframe()

            $.keyframe.generate()

            _.each @clouds, (obj) =>
                obj.playKeyframe()

        playIntro: =>
            console.log "BackgroundView.playIntro:", AppState.isIntro

        animate: =>
            _.each @clouds, (obj) => obj.animate()