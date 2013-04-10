define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    ], (
    $
    _b
    _u
    PageView
    ) ->

    class ThumbView extends PageView

        initialize: ->
            super()

        built: (obj, id) =>

            @id = Number(id)

            @el = """
                <div class='thumbsnails-links'>
                    <a href='./#gallery/#{id}' target='_self' title='#{obj.phototitle}'><img src='#{obj.thumb}' width='150px' height='150px' /></a>
                </div>
            """

        setPosition: (@initX, @initY) =>
            # #console.log @id, @initX, @initY

            # @el = $(".thumbsnails-links")

            # m = @initX + (@id * 10)
            # console.log m

            # @transform @el, m, @initY

        animate: =>
            #console.log "animate"
