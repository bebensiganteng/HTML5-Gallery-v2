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
            "click a#gallery-up":"onUp"
            "click a#gallery-right":"onRight"

        initialize: ->
            _.bindAll @, 'render', 'unrender', 'onLeft', 'onUp', 'onRight'

            @json       = @options.json
            @jsonlength = _.size @json

        render: (@ids) =>

            super(@ids)
            $(@el).append template

            selected = _.find @json, (obj, id) =>
                return id == @ids.id

            #console.log "SIZE:", _.size @json


            #console.log selected
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

            if @ids.id is 99
                page = 0
            else
                page++

            window.location.href = './#gallery/' + page

        onResize: =>
            super()

            console.log 'GalleryView.onResize:', @width, @height


