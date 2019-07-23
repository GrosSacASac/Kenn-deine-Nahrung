"use strict";

/*global F, R, DOM99, JS99, DATA, LANG, CONFIG, ratio, UTIL*/

/*jslint es6, browser, devel*/
var GAME1 = function () {
  "use strict";

  var L = LANG.de; // L = local lang

  var hide = UTIL.hide;
  var gameOn,
      // :boolean
  vars = JS99.vars,
      nodes = JS99.nodes,
      correctAnswers,
      // :string[]
  dataIndex,
      dataIndexNext,
      ratios,
      notFinished;

  var isCorrectName = function isCorrectName(input) {
    return R.any(R.eq(input.toLowerCase()), correctAnswers);
  };
  /*uses DATA
  this function allows us to pre load the next image in the background
  this was an experiment and is not very important, that's why
  you can find a similar function for game2
  */


  var displayNewImage = function displayNewImage(dataIndex, dataIndexNext) {
    var nowImage = "" + UTIL.imgDir + R.prop("image", DATA[dataIndex]),
        nextImage = "" + UTIL.imgDir + R.prop("image", DATA[dataIndexNext]),
        toDisplay,
        toHide; // we can't use nodes.foodImage.src because the address turns absolute

    if (nodes.foodImage.getAttribute("src") === nowImage) {
      toDisplay = nodes.foodImage;
      toHide = nodes.foodImageBis;
    } else if (nodes.foodImageBis.getAttribute("src") === nowImage) {
      toDisplay = nodes.foodImageBis;
      toHide = nodes.foodImage;
    } else {
      // first time
      toDisplay = nodes.foodImage;
      toHide = nodes.foodImageBis;
      toDisplay.src = nowImage;
    }

    toDisplay.classList.remove(hide);
    toHide.classList.add(hide);
    toHide.src = nextImage; //pre load next
  };

  var next = function next() {
    dataIndex = dataIndexNext;
    /*approaching the end, an index that was taken in advance with
    dataIndexNext can since the time be an invalid index because the user 
    has owned this difficult word now. 
    */

    if (!R.contains(dataIndex, notFinished)) {
      dataIndex = notFinished[Math.floor(Math.random() * notFinished.length)];
    }

    dataIndexNext = notFinished[Math.floor(Math.random() * notFinished.length)]; // compute the correct answers 

    correctAnswers = R.concat([R.prop("name", DATA[dataIndex])], R.prop("alternatives", DATA[dataIndex])); //display the new image and preloads the next

    displayNewImage(dataIndex, dataIndexNext); // reset input field

    vars.input = "";
    nodes.input.focus();
  };
  /*uses L, JS99.vars
  this function looks a string and outputs to the user if it doesn't make sense
  returns true if everything is fine
  */


  var reasonInputNonSense = function reasonInputNonSense(input) {
    if (input.length < 3) {
      return L.tooShort;
    }

    if (input.length > 100) {
      return L.tooLong;
    }

    if (!UTIL.isDiverse(input)) {
      return L.notSerious;
    }

    return "";
  };

  var adjustScores = function adjustScores(input) {
    if (isCorrectName(input)) {
      vars.feedback = UTIL.randomSelect(L.wellDone);
      ratios[dataIndex][0] += 1;
    } else {
      vars.feedback = UTIL.randomSelect(L.wrong) + " " + UTIL.capitalize(input) + " \u2260 " + UTIL.capitalize(DATA[dataIndex].name);
      ratios[dataIndex][1] += 1;
    }
  };

  var showProgress = function showProgress() {
    if (UTIL.isFinished(ratios[dataIndex])) {
      // we remove it from the not finished list
      notFinished = R.remove(R.findIndex(R.eq(dataIndex), notFinished), 1, notFinished);

      if (UTIL.isGameOver(notFinished)) {
        nodes.game1.classList.add(hide);
        gameOn = false;
        UTIL.showTryAgainButton(L.thanks);
        vars.feedback = L.gameOver;
        nodes.progress.value = 1.0; // avoid 0 division error

        return;
      } // else


      nodes.progress.value = 1 - notFinished.length / DATA.length;
    }
  };

  var tryAgain = function tryAgain() {
    nodes.game1.classList.remove(hide);
    gameOn = true;
    ratios = R.times(ratio, DATA.length);
    notFinished = R.range(0, DATA.length);
    nodes.progress.value = 0.0;
    vars.feedback = "";
    vars.input = "";
    next();
  };

  var gameLoop = function gameLoop() {
    // is the game on ?
    if (!gameOn) {
      return;
    } //clean input


    var input = UTIL.cleanUserInput(vars.input); // let user give up with "?"

    if (input !== "?") {
      // does input make sense ?
      var whyDoesItMakeNoSense = reasonInputNonSense(input);

      if (whyDoesItMakeNoSense) {
        vars.feedback = whyDoesItMakeNoSense;
        return;
      }
    } // give feedback and adjust scores


    adjustScores(input);
    /* show progress, game over now ? */

    showProgress();

    if (!gameOn) {
      return;
    } // next


    next();
  };

  return Object.freeze({
    gameLoop: gameLoop,
    tryAgain: tryAgain
  });
}();