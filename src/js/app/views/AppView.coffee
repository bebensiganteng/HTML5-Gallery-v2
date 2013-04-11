define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'libs/stately'
    'controllers/AppState'
    'views/desktop/DesktopView'
    'views/mobile/MobileView'
    #'json!php/json.php' #change this to php when live
    'json!php/temp.json'
    'libs/pixi'
    ], (
    $
    _b
    _u
    Stately
    AppState
    DesktopView
    MobileView
    json
    pixi
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

            @render()
            @initMachine()

            $( window ).resize @platform.onResize
            # $( window ).focus @onFocus
            # $( window ).blur @onBlur

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
                .setDesktopInteraction()
            else
                @platform = new MobileView
                    el: @el
                    json: @json
                .setMobileInteraction()

            @animate()

        # Centralized requestAnimationFrame, so it wont get stacked
        animate: =>
            requestAnimationFrame @animate

            if !AppState.isPaused
                @platform.animate()
            

        onAssetsLoaded: =>
            console.log "AppView.onAssetsLoaded"

        onHashChanged: (subid, id) =>
            @platform.setIds {subid, id}

            # for regular site this is not needed
            if @machine.getMachineState().toLowerCase() is subid
                @platform.updatePage()
            else
                @machine[subid]()

        scrollUp: =>
            $("html, body").animate scrollTop: "0px", 500

