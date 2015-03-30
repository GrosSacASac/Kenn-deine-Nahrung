// install
(function () {
    var registry,
        manifestPath = "/manifest.webapp";
    try {
        registry = window.navigator.mozApps;
        if (!registry.checkInstalled(manifestPath)) {
            registry.install(manifestPath);
        }
    }
    catch (e) {
       // statements to handle any exceptions
       console.log(e);
    }

}());