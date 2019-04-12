/*global F, R, DOM99, JS99, DATA, LANG, CONFIG, ratio, UTIL */
/*jslint es6, browser, devel*/
const GAME2 = (function () {
    "use strict";

    const L = LANG.de; // L = local lang
    const numberOfImages = 4;
    const hide = UTIL.hide;
    
    let gameOn, // :boolean
        pause, // :boolean
        output = JS99.vars,
        nodes = JS99.nodes,
        inputCanBe = [0, 1, 2, 3],
        correctAnswer, // -1 < correctAnswer < 4
        dataIndex, // :number
        imageIndexes, // :number[4]
        ratios, // :ratio[]
        notFinished; // :number[]
    
    const maxTurns = 5000;
    let turns = 0;
    const isCorrectImage = function (input, correctAnswer) {
        return input === correctAnswer;
    };
        
    /*uses DATA
    */
    const displayNewImages = function (imageIndexes) {
        R.forEachIndexed(function (imageIndex, i) {
            nodes[i].src = `${UTIL.imgDir}${R.prop("image", DATA[imageIndex])}`;
        }, imageIndexes);
    };
    
    const unPause = function () {
        pause = false;
        output.feedback = "";
        next();
    };
    
    const next = function () {
        dataIndex = notFinished[UTIL.random(notFinished.length)];
        correctAnswer = UTIL.random(4);
        /* we take 3 image that are perhaps already finished
        plus 1 that is surely not finished and we place it 
        at the correct answer position in between the 3 other*/
        imageIndexes = R.insert(correctAnswer, dataIndex, UTIL.randomSelectMulti(
            R.remove(dataIndex, 1, R.range(0, DATA.length)),
            3
        ));
                
        //display the new images
        displayNewImages(imageIndexes);
        
        //make sure all images are visible
        R.times(function (i) {
            nodes[i].classList.remove(hide);
        }, numberOfImages);
        
        //display the new word
        output.word = UTIL.capitalize(DATA[dataIndex].name);
        turns += 1;
        if (turns >= maxTurns) {
            console.log('took too long, it is over');
        } else {
            const decision = ai.decide({possibilities: imageIndexes, state: output.word});
            requestAnimationFrame(() => {
                gameLoop({target: {id: String(imageIndexes.indexOf(decision))}});
            });
        }
    };
    
    const tryAgain = function () {
        nodes.game2.classList.remove(hide);
        gameOn = true;
        pause = false;
        ratios = R.times(ratio, DATA.length);
        notFinished = R.range(0, DATA.length);
        
        nodes.progress.value = 0.0;
        output.feedback = "";
        next();
    };
    
    const inputFromTarget = function (target) {
        return target.id;
    };
    
    const adjustScores = function (input) {
        if (isCorrectImage(input, correctAnswer)) {
            output.feedback = UTIL.randomSelect(L.wellDone);
            ratios[dataIndex][0] += 1;
            const previousAction = imageIndexes[input];
            ai.learn({possibilities: imageIndexes, state: output.word, previousAction});
        } else {
            /*hide everything EXCEPT right answer until a new click occurs*/
            pause = true;
            R.times(function (i) {
                if (i !== correctAnswer) {
                    nodes[i].classList.add(hide);
                }
            }, numberOfImages);
            setTimeout(() => {
                gameLoop({target: {id: String(correctAnswer)}});
            }, 1)
            
            output.feedback = `${UTIL.randomSelect(L.wrong)} ${L.thisWasTheRightImage} ${L.for_} ${UTIL.capitalize(DATA[dataIndex].name)}`;
            ratios[dataIndex][1] += 1;
        }
    };
    
    const showProgress = function () {
        if (UTIL.isFinished(ratios[dataIndex])) {
            // remove it from the not finished list
            notFinished = R.remove(R.findIndex(R.eq(dataIndex), notFinished), 1, notFinished);
            if (UTIL.isGameOver(notFinished)) {
                nodes.game2.classList.add(hide);
                gameOn = false;
                UTIL.showTryAgainButton(L.thanks);
                
                output.feedback = L.gameOver;
                nodes.progress.value = 1.0;// avoid 0 division error
                return;
            } // else
            nodes.progress.value = 1 - (notFinished.length / DATA.length);
        }
    };
    
    const gameLoop = function (event) {
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
        let input = Number(inputFromTarget(event.target));
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
        gameLoop,
        tryAgain
    });
}());

