"use strict";

/*global F, R, DOM99, JS99, DATA, LANG, CONFIG, ratio */
/*jslint es6, browser, devel*/
var UTIL = (function () {
    "use strict";

    var imgDir = "images/food/";
    var winRatio = 2; // see documentation/specification.md

    var isGameOver = function isGameOver(notFinished) {
        return notFinished.length === 0;
    };

    var isFinished = function isFinished(ratio) {
        return ratio[0] >= winRatio * ratio[1];
    };

    var capitalizeWord = function capitalizeWord(word) {
        return R.head(word).toUpperCase() + R.substringFrom(1, word);
    };

    /* by popular demand, see html/about.html */
    var inputHelper = R.pipe(R.replace(/ae/g, "ä"), R.replace(/ue/g, "ü"), R.replace(/oe/g, "ö"), R.replace(/sss/g, "ß"), R.replace(/AE/g, "Ä"), R.replace(/UE/g, "Ü"), R.replace(/OE/g, "Ö"));

    /* returns false if the string contains a character 
     who is present more than half the time*/
    var isDiverse = function isDiverse(input) {
        var max = R.compose(R.prop(1), R.maxBy(R.prop(1)), R.toPairs, R.countBy(R.identity))(input);
        return max <= R.length(input) / 2;
    };

    var cleanUserInput = R.pipe(R.replace(/[,\.\+]/g, ""), R.trim()
    //perhaps remove more other accidental character
    );

    /* expects a string, also removes double spaces
    only output expected value, with spaces split words*/
    var capitalize = R.pipe(R.split(" "), R.filter(Boolean), R.map(capitalizeWord), R.join(" "));

    /*
    ----- end of pure functions ------
    ----- start of not pure functions (quiet handy for games) ------
    */

    /*Returns a natural number between 0 inclusive to x exclusive
    [0:x[*/
    var random = function random(x) {
        return Math.floor(Math.random() * x);
    };

    var randomSelect = function randomSelect(array1) {
        return array1[random(array1.length)];
    };

    /*select multiple unique elements from an array, each element having an unique index
    in that array, does not change the array */
    var randomSelectMulti = function randomSelectMulti(array1, times) {
        var randomIndex = undefined,
            indexesTaken = [],
            selections = [];

        while (selections.length < times) {
            randomIndex = random(array1.length);
            if (!R.contains(randomIndex, indexesTaken)) {
                indexesTaken = R.append(randomIndex, indexesTaken);
                selections = R.append(array1[randomIndex], selections);
            }
        }
        return selections;
    };

    var showTryAgainButton = function showTryAgainButton(message) {
        var nodes = JS99.nodes;
        nodes.tryAgain.classList.remove("hide");
        nodes.tryAgainText.textContent = message;
    };

    return Object.freeze({
        isGameOver: isGameOver,
        isFinished: isFinished,
        capitalize: capitalize,
        isDiverse: isDiverse,
        cleanUserInput: cleanUserInput,
        inputHelper: inputHelper,
        imgDir: imgDir,
        random: random,
        randomSelect: randomSelect,
        randomSelectMulti: randomSelectMulti,
        showTryAgainButton: showTryAgainButton,
        hide: "hide"
    });
})();