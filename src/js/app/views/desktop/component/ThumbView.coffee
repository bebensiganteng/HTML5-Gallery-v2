define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    'controllers/AppState'
    'libs/tweenlite'
    'libs/easepack'
    ], (
    $
    _b
    _u
    PageView
    AppState
    _t
    _e
    ) ->

    class ThumbView extends PageView

        @THUMB_UPDATE   : 'THUMB_UPDATE'
        @THUMB_SELECTED : 'THUMB_SELECTED'

        @TWEEN_END      : 'TWEEN_END'

        @OBJ_WIDTH      : 150
        @OBJ_PADDING    : 5

        initialize: ->
            super()

        # photoid, phototitle, thumb, original
        # TODO: load and remove image as it go beyond stage
        built: (obj, id) =>

            @id = Number(id)

            return """
                <div id='thumbsnails-#{id}'>
                    <a href='./#thumbnails/#{id}' target='_self' title='#{obj.phototitle}'><img src='#{obj.thumb}' width='150px' height='150px' /></a>
                </div>
            """

        setPosition: (initX, endX) =>
            @w      = (@width - ThumbView.OBJ_WIDTH) / 2
            @el     = document.getElementById 'thumbsnails-' + @id
            @center = initX
            @initX  = initX + @id * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING)
            @endX   = @initX - endX

            @x = (if (AppState.isIntro) then @endX else @initX)

        selected: (d = 1.2) =>
            TweenLite.to @, d,
                onUpdate: @arbitrary
                x: @center
                ease: Expo.easeInOut
                onComplete: =>
                    @trigger ThumbView.THUMB_UPDATE, ThumbView.TWEEN_END

        getCenterNormal: =>
            return (Math.abs( @x - @w ) / @w)

        getScale: =>
            return 1 - @getCenterNormal() * 0.3

        getY: =>
            #return @y + Math.sin(@getCenterNormal() * 100)
            return @y

        arbitrary: =>
            @transform @el, @x, @getY(), 0, 0, @getScale()

            @trigger ThumbView.THUMB_UPDATE, ThumbView.THUMB_SELECTED, @

        follow: (id, posX) =>
            @x = posX + (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING) * (@id - id)

            @transform @el, @x, @getY(), 0, 0, @getScale()

        update: (@y, distance = 0, direction = 0, speed = 0 )=>

            # if @initX < @endX and @id is 19
            #     @trigger "end"

            @x += direction * (distance + speed)

            @transform @el, @x, @getY(), 0, 0, @getScale()





