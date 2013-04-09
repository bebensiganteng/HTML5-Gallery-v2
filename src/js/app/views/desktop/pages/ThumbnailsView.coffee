define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    'text!templates/desktop/thumbnails.html'
    ], (
    $
    _b
    _u
    PageView
    template
    ) ->

    class ThumbnailsView extends PageView

        json: null

        initialize: ->
            _.bindAll @, 'render', 'unrender'

            @json = @options.json

        render: =>

            $(@el).append template

            list = ['<ul>']

            # photoid, phototitle, thumb, original
            # TODO: use lazyloaders
            _.each @json, (obj) ->
                list.push """
                    <li>
                        <a href='#' target='_self' title='#{obj.phototitle}'><img src='#{obj.thumb}' width='150px' height='150px' /></a>
                    </li>
                """
                #console.log "ThumbnailsView.render:", obj

            list.push('</ul>')

            $("#thumbnails").append list.join('')
            

        unrender: =>
            $(@el).remove template



