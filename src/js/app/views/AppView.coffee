define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'controllers/AppState'
    'views/desktop/DesktopView'
    'views/mobile/MobileView'
    'libs/stately'
    #'json!php/json.php'
    'json!php/temp.json'
    ], (
    $
    _b
    _u
    AppState
    DesktopView
    MobileView
    Stately
    json
    ) ->

    class AppView extends Backbone.View

        el              : null
        json            : null

        platform        : null
        machine         : null

        initialize: ->
            _.bindAll this, 'render'

            @el         = $("#content")
            @json       = json

            $( window ).resize @onResize
            @onResize()

            @render()
            @initMachine()

        initMachine: =>

            @machine    = Stately.machine
                PRELOADER:
                    thumbnails: ->
                        @THUMBNAILS

                    gallery : ->
                        @GALLERY

                THUMBNAILS:
                    gallery: ->
                        @GALLERY

                GALLERY:
                    thumbnails: ->
                        @THUMBNAILS

            @machine.bind @platform.onStateChange


        # DOM

        render: =>
            if AppState.isDesktop
                @platform = new DesktopView
                    el: @el
                    json: @json
            else
                @platform = new MobileView
                    el: @el
                    json: @json

        onResize: =>
            console.log "AppView.onResize"

        onAssetsLoaded: =>
            console.log "AppView.onAssetsLoaded"

        onHashChanged: (subid, id) =>
            console.log "AppView.onHashChanged", subid, id
            @machine[subid]()

        scrollUp: =>
            $("html, body").animate scrollTop: "0px", 500

