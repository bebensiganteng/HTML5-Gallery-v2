define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    'controllers/AppState'
    'libs/tweenlite'
    'libs/easepack'
    'libs/preloadjs'
    'libs/jquery.transit'
    ], (
    $
    _b
    _u
    PageView
    AppState
    _t
    _e
    _p
    _tr
    ) ->

    class ThumbView extends PageView

        @THUMB_UPDATE   : 'THUMB_UPDATE'
        @THUMB_SELECTED : 'THUMB_SELECTED'
        @THUMB_CLICKED  : 'THUMB_CLICKED'

        @TWEEN_END      : 'TWEEN_END'

        @OBJ_WIDTH      : 150
        @OBJ_PADDING    : 20

        image           : null
        clicked         : null
        tagged          : null

        initialize: ->
            _.bindAll @, 'render', 'unrender'

        # photoid, phototitle, thumb, original
        # TODO: load and remove image as it go beyond stage
        built: (@obj, id) =>

            @id = Number(id)

            return """
                <div id='thumbsnails-#{id}'>
                    <div class="thumbsnails-title"><p>#{@obj.phototitle}</p></div>
                    <div class="thumbnails-arrow"></div>
                    <a href='./#thumbnails/#{id}' target='_self' title='#{@obj.phototitle}'></a>
                    <div id='thumbsnails-bg' class='thumbsnails-selected'></div>
                </div>
            """

        onFileLoad: (e) =>

            $("a", @thumb).append(e.result).transition
                opacity: 1
            , 500, "ease-in-out"

            @thumb.hover @onHoverOn, @onHoverOff

            @thumb.on "click", (e) =>

                e.preventDefault()

                @clicked = true

                if Number(@title.css("opacity"))
                    @transitionOut()
                else
                    window.location.href = """./#thumbnails/#{@id}"""

        onHoverOn: (e) =>
            @animateIn(false, 0) if !@tagged

        onHoverOff: (e) =>
            @animateOut(500, 0) if !@tagged

        setPosition: (initX, endX) =>

            @clicked    = false

            @el         = document.getElementById 'thumbsnails-' + @id
            @thumb      = $("""#thumbsnails-#{@id}""")
            @title      = $(".thumbsnails-title", @thumb)
            @bg         = $("#thumbsnails-bg", @thumb)
            @arrow      = $(".thumbnails-arrow", @thumb)
            @center     = initX
            @initX      = initX + @id * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING)
            @endX       = @initX - endX

            unless @image?
                @preload = new createjs.LoadQueue(false)
                @preload.addEventListener "fileload", @onFileLoad
                @preload.setMaxConnections 1
                @preload.loadFile @obj.thumb

            @x = (if (AppState.isIntro) then @endX else @initX)

        selected: (d = 1.2, bol = true, tagged = true) =>

            @tagged = tagged


            @animateIn(bol) if bol

            TweenLite.to @, d,
                onUpdate: @arbitrary
                x: @center
                ease: Back.easeOut
                onComplete: =>
                    @trigger ThumbView.THUMB_UPDATE, ThumbView.TWEEN_END if !bol

        deselected: (id) =>

            if @id isnt Number(id)
                @animateOut() if Number(@title.css("opacity")) is 1
                @tagged = false

        animateIn: (bol = true, d = 1500) =>
            #@bg.addClass "thumbsnails-selected"

            @title.stop().transition
                opacity: 1
                y: -130
                delay: d + 100
            , 500, "easeOutBack", =>
                @trigger ThumbView.THUMB_UPDATE, ThumbView.TWEEN_END if bol
                @transitionOut() if @clicked

            @bg.stop().transition
                scale: 1
                opacity: 1
                delay: d
            , 500, "easeOutBack"

            @arrow.stop().transition
                y: -80
                opacity: 1
                delay: d
            , 500, "easeOutBack"

        animateOut: (dur = 500, d = 1000) =>

            @title.stop().transition
                opacity: 0
                y: 0
                delay: d
            , dur, "ease-in-out"

            @arrow.stop().transition
                y: 0
                opacity: 0
                delay: d
            , dur, "ease-in-out"

            @bg.stop().transition
                scale: 0
                opacity: 1
                delay: d
            , dur, "ease-in-out"

        # POSITION/ANIMATION

        transitionIn: =>

        transitionOut: =>

            @trigger ThumbView.THUMB_UPDATE, ThumbView.THUMB_CLICKED, @

            @thumb.transition
                opacity: 0
                delay: 2000
            , 500, "ease-in-out"

        getCenterNormal: =>
            return (Math.abs( @x - @halfWidth ) / @halfWidth)

        getScale: =>
            return @getCenterNormal() * 0.3

        getY: =>
            return @y + Math.cos(@getCenterNormal() * 1.5) * -80

        getZ: =>
            return @getCenterNormal() * -100

        arbitrary: =>
            @transform @el, @x, @getY(), @getZ(), 0, 1

            @trigger ThumbView.THUMB_UPDATE, ThumbView.THUMB_SELECTED, @

        follow: (id, posX) =>

            @x = posX + (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING) * (@id - id)

            @transform @el, @x, @getY(), @getZ(), 0, 1


        update: (@y, distance = 0, direction = 0, speed = 0 )=>

            if !@clicked

                @x += direction * (distance + speed)
                @transform @el, @x, @getY(), @getZ(), 0, 1

            # adds filter?
            #@filter @el, @getCenterNormal() * 100

        onResize: =>
            super()

            @halfWidth = (@width - ThumbView.OBJ_WIDTH) / 2





