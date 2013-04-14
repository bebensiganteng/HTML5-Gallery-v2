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

        @TWEEN_END      : 'TWEEN_END'

        @OBJ_WIDTH      : 150
        @OBJ_PADDING    : 20

        image           : null
        clicked         : null

        initialize: ->
            _.bindAll @, 'render', 'unrender'


        # photoid, phototitle, thumb, original
        # TODO: load and remove image as it go beyond stage
        built: (@obj, id) =>

            @id = Number(id)

            return """
                <div id='thumbsnails-#{id}'>
                    <div class="thumbsnails-title"><p>#{@obj.phototitle}</p></div>
                    <a href='./#thumbnails/#{id}' target='_self' title='#{@obj.phototitle}'><img src='#{@obj.thumb}' width='150px' height='150px' /></a>
                </div>
            """

        onFileLoad: (e) =>
            #@image = e.result
            @jel = $("""#thumbsnails-#{@id}""")
            @jel.on "click", => @clicked = true

        onFileProgress: =>
            
        setPosition: (initX, endX) =>

            @clicked = false

            unless @image?
                # @preload = new createjs.LoadQueue()
                # @preload.addEventListener "fileload", @onFileLoad
                # @preload.addEventListener "fileprogress", @onFileProgress
                # @preload.setMaxConnections 5
                # @preload.loadFile @obj.thumb
                #debug
                @onFileLoad()

            @w      = (@width - ThumbView.OBJ_WIDTH) / 2
            @el     = document.getElementById 'thumbsnails-' + @id
            @title  = $("""#thumbsnails-#{@id} > div""")
            @center = initX
            @initX  = initX + @id * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING)
            @endX   = @initX - endX

            @x = (if (AppState.isIntro) then @endX else @initX)

        selected: (d = 1.2) =>
            @title.transition 
                opacity: 1
                y: -70
                delay: 1000
            , 500, "easeOutBack"

            TweenLite.to @, d,
                onUpdate: @arbitrary
                x: @center
                ease: Expo.easeInOut
                onComplete: =>
                    @trigger ThumbView.THUMB_UPDATE, ThumbView.TWEEN_END
                    @transitionOut() if @clicked

        deselected: (id) =>
            if @id isnt Number(id)
                if Number(@title.css("opacity")) is 1
                    @title.transition 
                        opacity: 0
                        y: 0
                    , 500, "easeInOutExpo"

        # POSITION/ANIMATION

        transitionIn: =>

        transitionOut: =>
            # @jel.transition 
            #     scale: 100
            # , 500, "ease-in-out"
            window.location.href = """./#gallery/#{@id}"""

        getCenterNormal: =>
            #return Math.abs(@x/@halfWidth)
            return (Math.abs( @x - @w ) / @w)

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

        # onResize: =>
        #     super()
        #     #@halfWidth = (@width/2)

        update: (@y, distance = 0, direction = 0, speed = 0 )=>

            # if @initX < @endX and @id is 19
            #     @trigger "end"

            @x += direction * (distance + speed)

            @transform @el, @x, @getY(), @getZ(), 0, 1





