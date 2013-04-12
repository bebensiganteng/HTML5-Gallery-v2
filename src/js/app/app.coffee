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
        new App()



