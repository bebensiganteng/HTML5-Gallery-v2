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

            return """
                <div id='thumbsnails-#{id}'>
                    <a href='./#gallery/#{id}' target='_self' title='#{obj.phototitle}'><img src='#{obj.thumb}' width='150px' height='150px' /></a>
                </div>
            """

        setPosition: (@initX, @initY) =>
            # #console.log @id, @initX, @initY

            @el = $("#thumbsnails-" + @id)
            @x  = @initX + @id * 165
            @y  = @initY

            @transform @el, @x, @y

        update: (tx) =>
            @x  = tx + @id * 165
            #s   = 1 - (Math.abs(@x - @initX)/@initX) * 0.2

            @transform @el, @x, @y, 0, 0.5
            # if @id == 0
            #     console.log s
            #     @transform @el, @x, @y, 0, s
            




