define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'libs/tweenlite'
    'libs/easepack'
    'views/PageView'
    'views/desktop/component/ThumbView'
    'text!templates/desktop/thumbnails.html'
    ], (
    $
    _b
    _u
    _t
    _e
    PageView
    ThumbView
    template
    ) ->

    class ThumbnailsView extends PageView

        dirX: 0
        tolerance: 1

        initDrag: null
        v: null

        initialize: ->
            super()

            @json = @options.json
            @jsonlength = _.size @json

        render: (@ids) =>

            super(@ids)

            $(@el).append template
            @th = $("#thumbnails")

            list = ["<div id='thumbnails-group'>"]
            @thumb = []

            # photoid, phototitle, thumb, original
            # TODO: use lazyloaders
            _.each @json, (obj, id) =>

                thumb = new ThumbView()

                list.push thumb.built(obj, id)

                @thumb.push thumb

            list.push "</div>"

            @th.append list.join('')

            @onResize()

            # TweenLite.to $("#thumbnails-group"), .35,
            #     css:
            #         "marginTop": "200px"
            #     ease: Back.easeOut


        onResize: =>
            super()

            @th.css
                width: @width
                height: @height

            @initX = (@width - 150)/2
            @initY = (@height - 150)/2

            # using tg.width() wasnt accurate
            @endX = -((@jsonlength * 165) - (@width/2) - (150/2))

            #@transform @tg, @initX, @initY

            _.each @thumb, (obj) => obj.setPosition @initX, @initY

            @tx = @initX

        animate: =>
            if @v
                d = Math.abs(@initDrag - @v) #distance
                if d >= 0
                    @v += @dirX * (d * 0.15) #speed
                    @tx += @dirX * d * @tolerance #transform

                    # if @tx > @initX
                    #     w = (@tx - @initX) / (@width/5)
                    #     @tolerance = 1 - w

                   _.each @thumb, (obj) => obj.update @tx

        # DESKTOP

        onMouseDown: (e) =>
            @drag       = true
            @v          = @initDrag = e.pageX
            @tolerance  = 1

        onMouseMove: (e) =>
            if @drag
                #console.log e.pageX/@widths
                if e.pageX > @initDrag
                    @dirX = 1
                else
                    @dirX = -1

                @initDrag = e.pageX

        onMouseUp: (e) =>
            @drag = false
            # if @tx > @initX
            #     @tg.transition x: @initX
            #@v = @initDrag = null
            #@dirX = 0

        # MOBILE

        onTouchStart: (e) =>
            

        onTouchMove: (e) =>
            

        onTouchEnd: (e) =>
            



