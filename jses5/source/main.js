"use strict";

/*global F, R, DOM99, JS99, DATA, LANG, CONFIG, ratio, GAME1, GAME2, UTIL */
/*jslint es6, browser, devel*/
(function () {
    "use strict";
    var L = LANG.de; //L = local lang
    var minimumTimeMS = 100;
    /* if two events occurs with less than 100 milliseconds interval
    we can ignore the last because we assume it was not intentional
    I lost alot of time, not understanding what was happening
    before realizing that 2 events could have been fired in what a small time    
    minimumTimeMS value is game dependent */
    var lastTime = 0,
        thisTime = undefined,
        currentGame = undefined;

    var changeGame = function changeGame(game) {
        currentGame = game;
        currentGame.tryAgain();
        JS99.nodes.tryAgain.classList.add("hide");
    };

    var check = function check(event) {
        thisTime = Date.now();
        if (event.type === "keypress" && event.keyCode === 13 || event.type === "click" && thisTime - lastTime > minimumTimeMS) {
            currentGame.gameLoop(event);
            event.preventDefault();
        }
        lastTime = thisTime;
    };

    JS99.tryAgainGame1 = function () {
        changeGame(GAME1);
    };
    JS99.tryAgainGame2 = function () {
        changeGame(GAME2);
    };
    JS99.check = check;
    DOM99.linkJsAndDom(); //now we listen to events
    UTIL.showTryAgainButton(L.gladToSeeYou);
})();
// [enter] keyboard
// or click