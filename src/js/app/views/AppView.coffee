define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'libs/stately'
    'controllers/AppState'
    'views/desktop/DesktopView'
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
    json
    pixi
    ) ->

    class AppView extends Backbone.View

        el              : null
        json            : null

        platform        : null
        machine         : null

        subid           :null

        initialize: ->
            _.bindAll this, 'render'

            @el         = $("#content")
            @json       = json

            @initMachine()
            @render()

            @machine.bind @platform.onStateChange
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

        # DOM

        render: =>
            if AppState.isDesktop
                @platform = new DesktopView
                    el: @el
                    json: @json
                .setDesktopInteraction()
            else
                @platform = new DesktopView
                    el: @el
                    json: @json
                .setMobileInteraction()


        # Centralized requestAnimationFrame, so it wont get stacked
        animate: =>

            if @subid is "thumbnails" and !AppState.isPaused
                @platform.animate()
                requestAnimationFrame @animate

        onAssetsLoaded: =>
            @platform.playIntro()

        onHashChanged: (subid, id) =>
            @platform.setIds {subid, id}

            @subid = subid

            if @subid is "thumbnails"
                AppState.isPaused = false
                @animate()

            # for regular site this is not needed
            if @machine.getMachineState().toLowerCase() is subid
                @platform.updatePage()
            else
                unless @machine[subid]?()
                    window.location.href = "./#thumbnails/0"

        scrollUp: =>
            $("html, body").animate scrollTop: "0px", 500

