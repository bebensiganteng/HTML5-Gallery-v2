define [
    'jquery'
    'libs/backbone'
    'libs/pixi'
    'views/PageView'
    'controllers/appState'
    ], (
    $
    _b
    _p
    PageView
    AppState
    ) ->

    class RainGenerator extends PageView

        loader: null

        initialize: ->
            _.bindAll @, 'render', 'unrender'

            @drops = []
            @dropFrames = ["drop_1.png", "drop_2.png", "drop_3.png", "drop_4.png"]

            @stage = new PIXI.Stage(0xffffff)
            @renderer = PIXI.autoDetectRenderer(800, 600, null, true)

            $(@el).append @renderer.view

            # @dropContainer = new PIXI.DisplayObjectContainer()
            # @dropContainer.position.x = 400
            # @dropContainer.position.y = 300

            # @stage.addChild @dropContainer

        onAssetsLoaded: =>

            m = (if (not AppState.isTablet and not AppState.isMobile) then 20 else 10)

            for i in [0..m]
                frameName = @dropFrames[i % 4]

                drop = PIXI.Sprite.fromFrame frameName

                drop.position.x = Math.random() * @width - 100
                drop.position.y = Math.random() * -@height
                drop.anchor.x   = 0.5
                drop.anchor.y   = 0.5
                drop.scale.y = drop.scale.x = Math.random()

                @drops.push drop
                @stage.addChild drop

        unrender: =>
            console.log "RainGenerator.unrender"

        render: =>

            unless @loader?
                @loader = new PIXI.AssetLoader ["images/bg/drops.json"]
                @loader.onComplete = @onAssetsLoaded
                @loader.load()


        onResize: =>
            super()
            @renderer.resize @width, @height

        animate: =>

            for drop, i in @drops
                #wind = (i%10) * 0.2
                drop.position.y += drop.scale.x * 5
                drop.position.x += drop.scale.x
                drop.rotation = -drop.scale.x * 0.2

                if drop.position.y > @height
                    drop.position.x = Math.random() * @width
                    drop.position.y = -20

            @renderer.render @stage

