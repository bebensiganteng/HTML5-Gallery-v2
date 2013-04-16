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

        acc: .2
        dec: .1

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

                obj.update @initY

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

                    AppState.isPaused = true

                    @black.show().transition
                        opacity: 1
                    , 1000, "ease-in-out", =>
                        setTimeout =>
                            window.location.href = './#gallery/' + sel.id
                        , 2000

        updatePage: =>

            _.each @thumb, (obj) => obj.deselected @ids.id

            @thumb[@ids.id].selected .8

        animate: =>
            if @x0
                distance = Math.abs @x1 - @x0

                @speed += @acc  if distance > 0
                @speed -= @dec  if distance is 0
                @speed = 0 if @speed < 0 or @d1 isnt @d0

                # Slowdown drag if its beyon limit
                if @thumb[0].x > @thumb[0].initX or @thumb[0].x < @thumb[0].endX
                    @speed = 0
                    distance *= 0.1

                # FUCKING REPAINT + REFLOW
                _.each @thumb, (obj) =>
                    obj.update @initY, distance, @d0, @speed

                @x0 = @x1
                @d1 = @d0


        # DESKTOP
        #___________________________________________________

        onMouseDown: (e) =>
            if !AppState.isIntro and !@onTween
                @drag   = true
                @x0     = @x1 = e.pageX
                @speed  = 0

        onMouseMove: (e) =>
            if @drag
                @d0 = (if (e.pageX > @x1) then 1 else -1)
                @x1 = e.pageX

        onMouseUp: (e) =>

            @drag = false

            if @thumb[0].x > @thumb[0].initX
                @thumb[0].selected .4, false, false

            if @thumb[0].x < @thumb[0].endX
                @thumb[@jsonlength - 1].selected .4, false, false

        # MOBILE
        #___________________________________________________

        onTouchStart: (e) =>

            if !AppState.isIntro and !@onTween
                @drag   = true
                @x0     = @x1 = e.pageX
                @speed  = 0

        onTouchMove: (e) =>
            if @drag
                @d0 = (if (e.pageX > @x1) then 1 else -1)
                @x1 = e.pageX

                @animate()

        onTouchEnd: (e) =>
            @drag = false



