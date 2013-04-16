define [
    'jquery'
    'controllers/AppState'
    'controllers/AppRouter'
    'models/AssetsLoader'
    'views/AppView'
    ], (
    $
    AppState
    AppRouter
    AssetsLoader
    AppView
    ) ->

    class App

        constructor: ->

            appstate    = new AppState()
            appview     = new AppView()

            approuter   = new AppRouter()
            
            approuter.on AppRouter.EVENT_HASH_CHANGED, appview.onHashChanged
            approuter.start()

            # if you have a huge file that needed to be preloaded eachtime a page is loaded
            # assetloader = new AssetLoader()
            # assetloader.on AssetLoader.EVENT_LOADED, appview.onAssetsLoaded()

            appview.onAssetsLoaded()

    $ ->

        #https://gist.github.com/paulirish/1579671
        (->
            lastTime = 0
            vendors = ["ms", "moz", "webkit", "o"]
            x = 0

            while x < vendors.length and not window.requestAnimationFrame
                window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"]
                window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] or window[vendors[x] + "CancelRequestAnimationFrame"]
                ++x
            unless window.requestAnimationFrame
                window.requestAnimationFrame = (callback, element) ->
                    currTime = new Date().getTime()
                    timeToCall = Math.max(0, 16 - (currTime - lastTime))
                    id = window.setTimeout(->
                        callback currTime + timeToCall
                      , timeToCall)
                    lastTime = currTime + timeToCall
                    id
            unless window.cancelAnimationFrame
                window.cancelAnimationFrame = (id) ->
                    clearTimeout id
        )()
        new App()



