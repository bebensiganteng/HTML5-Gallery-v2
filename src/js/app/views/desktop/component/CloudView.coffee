define [
    'jquery'
    'libs/backbone'
    'libs/underscore'
    'views/PageView'
    'controllers/AppState'
    'libs/jquery.keyframes'
    ], (
    $
    _b
    _u
    PageView
    AppState
    _k
    ) ->

    class CloudView extends PageView

        built: (id) =>

            @id = Number(id)



            return """
                <div id="cloud-#{@id}">
                    <img src="images/bg/cloud.png" width="256" height="256"></div>
                </div>
            """

        addKeyframe: =>

            browser = $.keyframe.browserCode();

            #console.log "CloudView.addKeyframe:", @height

            x  = Math.random() * @width
            y  = Math.random() * ( @height * 0.2 ) - 150
            z  = -500 * Math.random()
            r  = Math.random() * 360

            #TODO: Create bulk addKeyFrame
            $.fn.addKeyframe [

                name: """cloudkey-#{@id}"""
                
                '0%': """
                    opacity: 0;
                    #{browser}transform: translate3d(#{ x }px, #{ y }px, #{ z }px );
                """

                '10%': """
                    opacity: 1;
                """

                '90%': """
                    opacity: 1;
                """

                '100%':  """
                    opacity: 0;
                    #{browser}transform:translate3d(#{ x }px, #{ y }px, #{ z + 200 }px );
                """

            ]

            @keyframe = true

        playKeyframe: =>
            $('#cloud-' + @id).playKeyframe
                name: """cloudkey-#{@id}"""
                duration: Math.random() * 30000 + 10000
                timingFunction: 'linear'
                delay: 0
                repeat: 'infinite'

        playIntro: =>




