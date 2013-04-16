define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'libs/jquery.transit'
    #'libs/jquery.lazyload'
    'views/PageView'
    'text!templates/desktop/gallery.html'
    ], (
    $
    _b
    _u
    _t
    #_l
    PageView
    template
    ) ->

    class GalleryView extends PageView

        tween: false
        preload: null

        events:
            "click a#gallery-left":"onLeft"
            "click a#gallery-close":"onUp"
            "click a#gallery-right":"onRight"

        initialize: ->
            _.bindAll @, 'render', 'unrender', 'onLeft', 'onUp', 'onRight'

            @json       = @options.json
            @jsonlength = _.size @json
            @collection = []

            _.each @json, (obj, id) =>
                @collection.push obj

        unrender: =>
            @gal.remove()

        render: (@ids) =>

            super(@ids)

            $(@el).append template

            @gal        = $("#gallery")
            @left       = $("#gallery-left")
            @right      = $("#gallery-right")
            @close      = $("#gallery-close")
            @content    = $("#gallery-content")
            @lthumb     = $("#gallery-thumbleft")
            @rthumb     = $("#gallery-thumbright")
            @ptext      = $("#gallery-preload")

            @left.hover @onHoverLeftOn, @onHoverLeftOff
            @right.hover @onHoverRightOn, @onHoverRightOff

            unless @preload?
                @initPreloader()

            @onResize()

            @updatePage()

        initPreloader: =>

            @preload = new createjs.LoadQueue(false)
            @preload.addEventListener "fileload", @onFileLoad
            @preload.addEventListener "progress", @onFileProgress
            @preload.setMaxConnections 1

        onFileLoad: (e) =>

            @builtAll e.result
            @ptext.hide()

        onFileProgress: (e) =>

        #_________________________________

        onLeft: (e) =>

            e.preventDefault()
            @onHoverLeftOff()
            @tween = true
            window.location.href = './#gallery/' + @getPrevious()

        onRight: (e) =>

            e.preventDefault()
            @onHoverRightOff()
            @tween = true
            window.location.href = './#gallery/' + @getNext()

        onHoverLeftOn: (e) =>
            if !@tween
                @lthumb.stop().transition
                    scale: 1
                    opacity: 1
                , 200, "easeOutExpo"

        onHoverLeftOff: (e) =>
            if !@tween
                @lthumb.stop().transition
                    scale: 0.5
                    opacity: 0
                    delay: 500
                , 100, "ease-in-out"

        onHoverRightOn: (e) =>
            if !@tween
                @rthumb.stop().transition
                    scale: 1
                    opacity: 1
                , 200, "easeOutExpo"

        onHoverRightOff: (e) =>
            if !@tween
                @rthumb.stop().transition
                    scale: 0.5
                    opacity: 0
                    delay: 500
                , 100, "ease-in-out"

        onUp: (e) =>
            e.preventDefault()
            window.location.href = './#thumbnails/' + @ids.id

        #_________________________________

        getPrevious: =>
            id = Number(@ids.id)

            return @jsonlength - 1 if id is 0

            return --id


        getNext: =>
            id = Number(@ids.id)

            return 0 if id is @jsonlength - 1

            return ++id

        #_________________________________

        onResize: =>
            super()

            vcenter = (@height - 54)/2
            hcenter = (@width - 54)/2


            @gal.css
                width: @width
                height: @height

            @right.css
                right: "20px"
                top: vcenter

            @left.css
                left: "20px"
                top: vcenter

            @lthumb.css
                left: "80px"
                top: vcenter

            @rthumb.css
                right: "80px"
                top: vcenter

            @close.css
                left: hcenter
                top: "10px"

        #_________________________________

        # # TODO: make it like adidas website
        # built: =>
        #     selected    = @collection[@ids.id]
            
        #     return """
        #         <img title='#{selected.phototitle}' src='#{selected.original}' />
        #     """

        builtThumb: (id) =>

            obj = @collection[id]

            return """
                <img title='#{obj.phototitle}' src='#{obj.thumb}' />
            """

        builtAll: (img) =>
            @content.append img
            @lthumb.append @builtThumb @getPrevious()
            @rthumb.append @builtThumb @getNext()

            @content.fadeIn 'slow', =>
                @tween = false
            # @content.transition
            #     opacity: 1
            # , 500, 'ease-in-out', =>
            #     @tween = false

            #@tween = false

        #_________________________________

        removeSelected: =>

            @content.fadeOut 'slow', =>

                @ptext.show()

                $(@content.children()).remove()
                $(@lthumb.children()).remove()
                $(@rthumb.children()).remove()

                @preload.loadFile @collection[@ids.id].original

        updatePage: =>
            @preload.close()

            if @content.children().length > 0

                @removeSelected()

            else

                @ptext.show()
                @preload.loadFile @collection[@ids.id].original
