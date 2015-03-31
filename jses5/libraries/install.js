"use strict";

// install, not working
(function () {
    "use strict";
    var registry,
        manifestPath = "/manifest.webapp";
    try {
        registry = window.navigator.mozApps;
        if (!registry.checkInstalled(manifestPath).result) {
            registry.install(manifestPath);
        }
    } catch (e) {
        // statements to handle any exceptions
        console.log(e);
    }
})();