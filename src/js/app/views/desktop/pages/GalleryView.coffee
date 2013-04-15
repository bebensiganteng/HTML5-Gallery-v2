define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    #'libs/jquery.lazyload'
    'views/PageView'
    'text!templates/desktop/gallery.html'
    ], (
    $
    _b
    _u
    #_l
    PageView
    template
    ) ->

    class GalleryView extends PageView

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

            @onResize()

            @updatePage()

        onLeft: (e) =>
            e.preventDefault()
            window.location.href = './#gallery/' + @getPrevious()

        onUp: (e) =>
            e.preventDefault()
            window.location.href = './#thumbnails/' + @ids.id

        onRight: (e) =>
            e.preventDefault()
            window.location.href = './#gallery/' + @getNext()

        getPrevious: =>
            id = Number(@ids.id)

            return @jsonlength - 1 if @ids.id is 0

            return id--


        getNext: =>
            id = Number(@ids.id)

            return 0 if @ids.id is @jsonlength - 1

            return id++

        onResize: =>
            super()

            @gal.css
                width: @width
                height: @height

            @right.css
                right: "20px"
                top: (@height - 46)/2

            @left.css
                left: "20px"
                top: (@height - 46)/2

            @close.css
                left: (@width - 46)/2
                top: "10px"

        # TODO: make it like adidas website
        built: =>
            #left        = @collection[@getPrevious()] # feature creep
            selected    = @collection[@ids.id]
            #right       = @collection[@getNext()]

            return """
                <img title='#{selected.phototitle}' src='#{selected.original}' />
            """

        removeSelected: =>
            child = @content.children()

            $(child).transition
                opacity: 0
            , 500, 'ease-in-out', =>
                $(child).remove()
                @content.append @built()

        updatePage: =>
            if @content.children().length > 0
                @removeSelected()
            else
                @content.append @built()
