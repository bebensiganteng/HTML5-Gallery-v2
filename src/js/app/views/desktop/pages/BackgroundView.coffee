define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'libs/jquery.keyframes'
    'views/PageView'
    'views/desktop/component/CloudView'
    'controllers/AppState'
    'controllers/RainGenerator'
    ], (
    $
    _b
    _u
    _k
    PageView
    CloudView
    AppState
    RainGenerator
    ) ->

    class BackgroundView extends PageView

        @INTRO_COMPLETE: 'INTRO_COMPLETE'

        numClouds: 30
        rain : null

        initialize: ->
            _.bindAll @, 'render', 'unrender'

        unrender: =>
            #@rain.unrender()
            #@bg.remove() if @bg

            $(@rainContainer)?.hide()
            @cloudContainer?.children().remove()

        render: (@ids) =>

            super(@ids)

            unless @rain?

                $(@el).append "<div id='background'>
                    <div id='background-clouds'></div>
                    <div id='background-rain'></div>
                </div>"

                @bg             = $("#background")
                @cloudContainer = $("#background-clouds")
                @rainContainer  = $("#background-rain")

                @rain = new RainGenerator
                    el: @rainContainer

            else

                $(@rainContainer).show()

            list = []
            @clouds = []

            for i in [0..@numClouds]

                cloud = new CloudView()

                list.push cloud.built(i)
                @clouds.push cloud

            @cloudContainer.append list.join ""

            @onResize()

            @rain.render()


        onResize: =>
            super()

            $.keyframe.removeHead()

            _.each @clouds, (obj) =>
                obj.onResize()
                obj.addKeyframe()

            $.keyframe.generate()

            _.each @clouds, (obj) =>
                obj.playKeyframe()

            @rain.onResize()

        playIntro: =>
            console.log "BackgroundView.playIntro:", AppState.isIntro

        animate: =>
            @rain.animate()