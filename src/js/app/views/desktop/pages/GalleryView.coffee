define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    'text!templates/desktop/gallery.html'
    ], (
    $
    _b
    _u
    PageView
    template
    ) ->

    class GalleryView extends PageView

        initialize: ->
            _.bindAll @, 'render', 'unrender'

        render: =>
            $(@el).append template

        unrender: =>
            $(@el).remove template

