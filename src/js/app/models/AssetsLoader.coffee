define [
    'libs/backbone'
    'libs/preloadjs'
    ], (
    _b
    _p
    ) ->

    class AssetsLoader

        @EVENT_LOADED: 'EVENT_LOADED'

        constructor : ->
            _.extend @, Backbone.Events

        start: (@manifest) =>
            @preload = new createjs.LoadQueue(true)

            @preload.addEventListener("fileload", @handleFileLoad)
            @preload.addEventListener("progress", @handleOverallProgress)
            @preload.addEventListener("error", @handleFileError)
            @preload.setMaxConnections(5)

            @load() while @manifest.length > 0


        handleFileLoad: (event) =>
            if @preload._currentLoads.length is 0
                @.trigger(AssetsLoader.EVENT_LOADED)

        handleOverallProgress: (event) =>
            console.log "handleOverallProgress:", @preload.progress

        handleFileError: (event) =>
            alert("AssetsLoader.handleFileError")

        load: =>
            @preload.loadFile(@manifest.shift())
