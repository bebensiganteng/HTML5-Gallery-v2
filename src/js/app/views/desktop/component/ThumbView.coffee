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

        clicked         : false
        selected        : false

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
                    <div class='thumbsnails-selected'></div>
                </div>
            """

        init: =>

            name    = """thumbsnails-#{@id}"""

            @dom    = document.getElementById name
            @thumb  = $("#" + name)
            @href   = $("a", @thumb)
            @title  = $(".thumbsnails-title", @thumb)
            @bg     = $(".thumbsnails-selected", @thumb)
            @arrow  = $(".thumbnails-arrow", @thumb)

            @preload = new createjs.LoadQueue(false)
            @preload.addEventListener "fileload", @onFileLoad
            @preload.setMaxConnections 1
            @preload.loadFile @obj.thumb

        onFileLoad: (e) =>

            @href.append e.result

            @href.hover @onHoverOn, @onHoverOff

            @href.on "click", (e) =>
                e.preventDefault

                @clicked = true

                if @selected
                    @trigger(ThumbView.THUMB_UPDATE, ThumbView.THUMB_CLICKED, @)
                else
                    window.location.href = """./#thumbnails/#{@id}"""

        setPosition: (@center, @y, endX) =>

            @initX      = @center + @id * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING)
            @endX       = @initX - endX
            @halfWidth  = (@width - ThumbView.OBJ_WIDTH) / 2

            @x          = @initX

        #_________________________________________

        onHoverOn: (e) =>

            @title.stop().transition
                opacity: 1
                y: -130
            , 500, "easeOutBack"

            @arrow.stop().transition
                y: -80
                opacity: 1
            , 500, "easeOutBack"

            @bg.stop().transition
                scale: 1
                opacity: 1
            , 500, "easeOutExpo"

        onHoverOff: (e) =>

            @hideAll() if !@selected

        hideAll: (bol = false) =>

            s = (if (bol) then 200 else 500)

            @title.stop().transition
                opacity: 0
                y: 0
            , s, "ease-in-out"

            @arrow.stop().transition
                y: 0
                opacity: 0
            , s, "ease-in-out"

            @bg.stop().transition
                scale: .5
                opacity: 0
            , s, "ease-in-out"

            if bol
                @href.stop().transition
                    scale: .5
                    opacity: 0
                    delay: 500
                , s, "ease-in-out"

        # CALCULATES POS
        #_________________________________________

        update: (distance = 0, direction = 0, speed = 0 ) =>

            @x += direction * (distance + speed)
            @transform @dom, @x, @getY(), @getZ()

            #Adds filter?
            #@filter @el, @getCenterNormal() * 100

        getCenterNormal: =>
            return (Math.abs( @x - @halfWidth ) / @halfWidth)

        getScale: =>
            return @getCenterNormal() * 0.3

        getY: =>
            return @y + Math.cos(@getCenterNormal() * 1.5) * -80

        getZ: =>
            return @getCenterNormal() * -100

        gotoCenter: (@selected = false, e = 1) =>

            if (e is 1)
                e = Expo.easeInOut
                d = 1.2
            else
                e = Back.easeOut
                d = 0.4

            TweenLite.to @, d,
                x       : @center
                ease    : e
                onUpdate: =>
                    @update()
                    @trigger ThumbView.THUMB_UPDATE, ThumbView.THUMB_SELECTED, @

                onComplete: =>
                    @onHoverOn() if @selected
                    @trigger ThumbView.THUMB_UPDATE, ThumbView.TWEEN_END
                    @trigger(ThumbView.THUMB_UPDATE, ThumbView.THUMB_CLICKED, @) if @clicked

        follow: (id, posX) =>

            @x = posX + (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING) * (@id - id)

            @update()






