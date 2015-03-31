"use strict";

/*global F, R, DOM99, JS99, DATA, LANG, CONFIG, ratio, UTIL */
/*jslint es6, browser, devel*/
var GAME2 = (function () {
    "use strict";

    var L = LANG.de; // L = local lang
    var numberOfImages = 4;
    var hide = UTIL.hide;

    var gameOn = undefined,
        // :boolean
    pause = undefined,
        // :boolean
    output = JS99.vars,
        nodes = JS99.nodes,
        inputCanBe = [0, 1, 2, 3],
        correctAnswer = undefined,
        // -1 < correctAnswer < 4
    dataIndex = undefined,
        // :number
    imageIndexes = undefined,
        // :number[4]
    ratios = undefined,
        // :ratio[]
    notFinished = undefined; // :number[]

    var isCorrectImage = function isCorrectImage(input, correctAnswer) {
        return input === correctAnswer;
    };

    /*uses DATA
    */
    var displayNewImages = function displayNewImages(imageIndexes) {
        R.forEachIndexed(function (imageIndex, i) {
            nodes[i].src = "" + UTIL.imgDir + "" + R.prop("image", DATA[imageIndex]);
        }, imageIndexes);
    };

    var unPause = function unPause() {
        pause = false;
        output.feedback = "";
        next();
    };

    var next = function next() {
        dataIndex = notFinished[UTIL.random(notFinished.length)];
        correctAnswer = UTIL.random(4);
        /* we take 3 image that are perhaps already finished
        plus 1 that is surely not finished and we place it 
        at the correct answer position in between the 3 other*/
        imageIndexes = R.insert(correctAnswer, dataIndex, UTIL.randomSelectMulti(R.remove(dataIndex, 1, R.range(0, DATA.length)), 3));

        //display the new images
        displayNewImages(imageIndexes);

        //make sure all images are visible
        R.times(function (i) {
            nodes[i].classList.remove(hide);
        }, numberOfImages);

        //display the new word
        output.word = UTIL.capitalize(DATA[dataIndex].name);
    };

    var tryAgain = function tryAgain() {
        nodes.game2.classList.remove(hide);
        gameOn = true;
        pause = false;
        ratios = R.times(ratio, DATA.length);
        notFinished = R.range(0, DATA.length);

        nodes.progress.value = 0;
        output.feedback = "";
        next();
    };

    var inputFromTarget = function inputFromTarget(target) {
        return target.id;
    };

    var adjustScores = function adjustScores(input) {
        if (isCorrectImage(input, correctAnswer)) {
            output.feedback = UTIL.randomSelect(L.wellDone);
            ratios[dataIndex][0] += 1;
        } else {
            /*hide everything EXCEPT right answer until a new click occurs*/
            pause = true;
            R.times(function (i) {
                if (i !== correctAnswer) {
                    nodes[i].classList.add(hide);
                }
            }, numberOfImages);
            output.feedback = "" + UTIL.randomSelect(L.wrong) + " " + L.thisWasTheRightImage + " " + L.for_ + " " + UTIL.capitalize(DATA[dataIndex].name);
            ratios[dataIndex][1] += 1;
        }
    };

    var showProgress = function showProgress() {
        if (UTIL.isFinished(ratios[dataIndex])) {
            // remove it from the not finished list
            notFinished = R.remove(R.findIndex(R.eq(dataIndex), notFinished), 1, notFinished);
            if (UTIL.isGameOver(notFinished)) {
                nodes.game2.classList.add(hide);
                gameOn = false;
                UTIL.showTryAgainButton(L.thanks);

                output.feedback = L.gameOver;
                nodes.progress.value = 1; // avoid 0 division error
                return;
            } // else
            nodes.progress.value = 1 - notFinished.length / DATA.length;
        }
    };

    var gameLoop = function gameLoop(event) {
        // is the game on ?
        if (!gameOn) {
            return;
        }

        // if the game is paused, resume
        if (pause) {
            unPause();
            return;
        }

        // determine input
        // inputCanBe = [0, 1, 2, 3];
        var input = Number(inputFromTarget(event.target));
        if (!R.contains(input, inputCanBe)) {
            return;
        }

        // give feedback and adjust scores
        adjustScores(input);

        /* show progress, game over now ? */
        showProgress();
        if (!gameOn) {
            return;
        }

        // next
        if (!pause) {
            next();
        }
    };

    return Object.freeze({
        gameLoop: gameLoop,
        tryAgain: tryAgain
    });
})();