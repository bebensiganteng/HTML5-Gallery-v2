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

        render: (@ids) =>

            super(@ids)
            $(@el).append template

            @gal    = $("#gallery")
            @left   = $("#gallery-left")
            @right  = $("#gallery-right")
            @close  = $("#gallery-close")

            @onResize()

            selected = _.find @json, (obj, id) =>
                return id == @ids.id

            $("#gallery-content").append "<img title='#{selected.phototitle}' src='#{selected.original}' />"
            #$("img").lazyload effect: "fadeIn"

        onLeft: (e) =>
            e.preventDefault()

            page = Number(@ids.id)

            if @ids.id is 0
                page = @jsonlength - 1
            else
                page--

            window.location.href = './#gallery/' + page

        onUp: (e) =>
            e.preventDefault()
            window.location.href = './#thumbnails/' + @ids.id

        onRight: (e) =>
            e.preventDefault()

            page = Number(@ids.id)

            if @ids.id is @jsonlength - 1
                page = 0
            else
                page++

            window.location.href = './#gallery/' + page


        onResize: =>
            super()

            @gal.css
                width: @width
                height: @height

            @right.css
                right: "10px"
                top: @height/2

            @left.css
                left: "10px"
                top: @height/2

            @close.css
                left: @width/2
                top: "10px"


