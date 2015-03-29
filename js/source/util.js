/*global F, R, DOM99, JS99, DATA, LANG, CONFIG, ratio */
/*jslint es6, browser, devel*/
const UTIL = (function () {
    "use strict";
    
    const imgDir = "images/food/";
    const winRatio = 2; // see documentation/specification.md
    
    const isGameOver = function (notFinished) {
        return notFinished.length === 0;
    };
    
    const isFinished = function (ratio) {
        return (ratio[0] >= (winRatio * ratio[1]));
    };
    
    const capitalizeWord = function (word) {
        return R.head(word).toUpperCase() + R.substringFrom(1, word);
    };
    
    /* returns false if the string contains a character 
     who is present more than half the time*/
    const isDiverse = function (input) {
        let max = R.compose(R.prop(1), R.maxBy(R.prop(1)), R.toPairs, 
                R.countBy(R.identity))(input);
        return max <= R.length(input)/2;
    };
    
    const cleanUserInput = function (UserString) {
        //perhaps remove other accidental character
        return R.replace(/[,\.\+]/g, "", R.trim(UserString));
    };
    
    /* also removes double spaces
    only output expected value, with spaces split words*/
    const capitalize =  function (string1) {
        return R.pipe(
            R.split(" "),
            R.filter(Boolean),
            R.map(capitalizeWord),
            R.join(" ")
            )(string1);
    };
    
    /*
    ----- end of pure functions ------
    ----- start of not pure functions (quiet handy for games) ------
    */
    
    /*Returns a natural number between 0 inclusive to x exclusive
    [0:x[*/
    const random = function (x) {
        return Math.floor(Math.random() * x);
    };
    
    const randomSelect = function (array1) {
        return array1[random(array1.length)];
    };
    
    /*select multiple unique elements from an array, each element having an unique index
    in that array, does not change the array */
    const randomSelectMulti = function (array1, times) {
        let randomIndex,
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
    
    const showTryAgainButton = function (message) {
        let nodes = JS99.nodes;
        nodes.tryAgain.classList.remove("hide");
        nodes.tryAgainText.textContent = message;
    };
    
    
    return Object.freeze({
        isGameOver,
        isFinished,
        capitalize,
        isDiverse,
        cleanUserInput,
        imgDir,
        random,
        randomSelect,
        randomSelectMulti,
        showTryAgainButton
    });
}());

