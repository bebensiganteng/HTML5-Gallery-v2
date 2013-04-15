define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'libs/tweenlite'
    'libs/easepack'
    'libs/jquery.transit'
    'libs/preloadjs'
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
    _tr
    _p
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

        unrender: =>
            @th.remove()

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

            list.push "<div id='thumbnails-black'></div>"
            list.push "</div>"

            @th.append list.join('')

            @drag           = false
            @d0             = @d1 = 0
            @x0             = @x1 = 0
            @speed          = 0
            @outOfBounds    = false
            @black          = $("#thumbnails-black")

            @black.hide()

            @onResize()
            @updatePage()

        onResize: =>
            super()

            @th.css
                width: @width
                height: @height

            @black.css
                width: @width
                height: @height

            #@initX = 0
            @initX = (@width - 150)/2
            @initY = @height * 0.6

            # using tg.width() wasnt accurate
            @endX = (@jsonlength - 1) * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING)

            _.each @thumb, (obj) =>
                unless obj.initX?
                    obj.onResize()
                    obj.setPosition @initX, @endX
                    obj.on ThumbView.THUMB_UPDATE, @onThumbUpdate

                    # TODO: optimize
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

                when ThumbView.THUMB_CLICKED
                    @black.show().transition
                        opacity: 1
                    , 1000, "ease-in-out"
                    sel.id

        updatePage: =>

            _.each @thumb, (obj) => obj.deselected @ids.id

            @thumb[@ids.id].selected(.8)

        animate: =>
            if @x0
                distance = Math.abs @x1 - @x0

                @speed += @acc  if distance > 0
                @speed -= @dec  if distance is 0
                @speed = 0 if @speed < 0 or @d1 isnt @d0

                # REPAINT?
                # _.each @thumb, (obj) =>
                #     obj.update @initY, distance, @d0, @speed 

                @x0 = @x1
                @d1 = @d0


        # DESKTOP

        onMouseDown: (e) =>
            if !AppState.isIntro && !@onTween
                @drag   = true
                @x0     = @x1 = e.pageX
                @speed  = 0

        onMouseMove: (e) =>
            if @drag
                @d0 = (if (e.pageX > @x1) then 1 else -1)
                @x1 = e.pageX

        onMouseUp: (e) =>
            @drag = false

        # MOBILE

        onTouchStart: (e) =>
            

        onTouchMove: (e) =>
            

        onTouchEnd: (e) =>
            



