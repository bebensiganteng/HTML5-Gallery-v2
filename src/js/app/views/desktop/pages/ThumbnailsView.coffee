define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'libs/tweenlite'
    'libs/easepack'
    'controllers/AppState'
    'views/PageView'
    'views/desktop/component/ThumbView'
    'text!templates/desktop/thumbnails.html'
    ], (
    $
    _b
    _u
    _t
    _e
    AppState
    PageView
    ThumbView
    template
    ) ->

    class ThumbnailsView extends PageView

        acc: .5
        dec: .2

        outOfBounds: null
        onTween: true

        initialize: ->
            super()

            @json       = @options.json
            @jsonlength = _.size @json

        render: (@ids) =>

            super(@ids)

            $(@el).append template
            @th = $("#thumbnails")

            list = ["<div id='thumbnails-group'>"]
            @thumb = []

            _.each @json, (obj, id) =>

                thumb = new ThumbView()

                list.push thumb.built(obj, id)

                @thumb.push thumb

            list.push "</div>"

            @th.append list.join('')

            @drag           = false
            @direction      = 0
            @x0             = @x1 = 0
            @speed          = 0
            @outOfBounds    = false

            @onResize()
            @updatePage()

        onResize: =>
            super()

            @th.css
                width: @width
                height: @height

            @initX = (@width - 150)/2
            @initY = (@height - 150)/2

            # using tg.width() wasnt accurate
            @endX = (@jsonlength - 1) * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING)

            _.each @thumb, (obj) =>
                unless obj.initX?
                    obj.onResize()
                    obj.setPosition @initX, @endX
                    obj.on ThumbView.THUMB_UPDATE, @onThumbUpdate

                    # if obj.id is @jsonlength - 1
                    #     obj.on "end", @endReached

                obj.update @initY

        # endReached: =>
        #     if !@outOfBounds
        #         @outOfBounds = true

        #         # TweenLite.to @, 1,
        #         #     onUpdate: @test
        #         #     ease: Back.easeOut

        onThumbUpdate: (e, sel) =>
            switch e
                when ThumbView.THUMB_SELECTED

                    @onTween = true
                    _.each @thumb, (obj) =>
                        unless obj.id is sel.id
                            obj.follow sel.id, sel.x

                when ThumbView.TWEEN_END
                    @onTween = false
                    AppState.isIntro = false if AppState.isIntro

        updatePage: =>
            @thumb[@ids.id].selected(.8)

        animate: =>
            if @x0
                distance = Math.abs @x1 - @x0

                @speed += @acc  if distance > 0
                @speed -= @dec  if distance is 0 and @speed > 0
                @speed = 0 if @speed < 0

                _.each @thumb, (obj) =>
                    obj.update @initY, distance, @direction, @speed

                @x0 = @x1


        # DESKTOP

        onMouseDown: (e) =>
            if !AppState.isIntro && !@onTween
                @drag   = true
                @x0     = @x1 = e.pageX
                @speed  = 0


        onMouseMove: (e) =>
            if @drag
                @direction = (if (e.pageX > @x1) then 1 else -1)
                @x1 = e.pageX


        onMouseUp: (e) =>
            @drag = false

        # MOBILE

        onTouchStart: (e) =>
            

        onTouchMove: (e) =>
            

        onTouchEnd: (e) =>
            



