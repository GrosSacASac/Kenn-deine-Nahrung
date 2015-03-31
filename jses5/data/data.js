"use strict";

/*I know you must capitalize Nomen, but here these should all be lower-case
  They will be capitalized again when printed to the screen
*/
var DATA = [{
    image: "1.jpg",
    article: "w", //weiblich --> Die
    name: "karotte",
    alternatives: ["möhre", "mohrrübe"]
}, {
    image: "2.jpg",
    article: "w",
    name: "tomate",
    alternatives: []
}, {
    image: "3.jpg",
    article: "w",
    name: "kartoffel",
    alternatives: ["knolle"]
}, {
    image: "4.jpg",
    article: "m",
    name: "apfel",
    alternatives: ["apful"] // früher
}, {
    image: "5.jpg",
    article: "w",
    name: "banane",
    alternatives: []
}, {
    image: "6.jpg",
    article: "w",
    name: "avocado",
    alternatives: ["butterbirne"]
}, {
    image: "7.jpg",
    article: "w",
    name: "paprika",
    alternatives: ["spanischer pfeffer"]
}, {
    image: "8.jpg",
    article: "w",
    name: "zwiebel",
    alternatives: []
}, {
    image: "9.jpg",
    article: "w",
    name: "mandarine",
    alternatives: []
}, {
    image: "10.jpg",
    article: "w",
    name: "süßkartoffel",
    alternatives: ["süsskartoffel", "süß kartoffel", "süß-kartoffel"]
}, {
    image: "11.jpg",
    article: "m",
    name: "zucchini",
    alternatives: ["zucchetti"]
}, {
    image: "12.jpg",
    article: "w",
    name: "lauch",
    alternatives: []
}, {
    image: "13.jpg",
    article: "w",
    name: "aubergine",
    alternatives: []
}, {
    image: "14.jpg",
    article: "w",
    name: "gurke",
    alternatives: []
}, {
    image: "15.jpg",
    article: "m",
    name: "ingwer",
    alternatives: ["ingwerwurzel", "immerwurzel"]
}, {
    image: "16.jpg",
    article: "w",
    name: "birne",
    alternatives: []
}, {
    image: "17.jpg",
    article: "m",
    name: "kiwi",
    alternatives: []
}, {
    image: "18.jpg",
    article: "w",
    name: "orange",
    alternatives: []
}, {
    image: "19.jpg",
    article: "w",
    name: "salatpflanze",
    alternatives: ["salat"]
}, {
    image: "20.jpg",
    article: "w",
    name: "mais",
    alternatives: ["mays", "kukuruz"]
}, {
    image: "21.jpg",
    article: "w",
    name: "schalotte",
    alternatives: ["eschalotte", "eschlauch", "edelzwiebel"]
}, {
    image: "22.jpg",
    article: "m",
    name: "broccoli",
    alternatives: ["brokkoli"]
}, {
    image: "23.jpg",
    article: "w",
    name: "champignons",
    alternatives: ["champignon", "pilze", "pilz", "egerlinge", "angerlinge"]
}, {
    image: "24.jpg",
    article: "w",
    name: "artischoke",
    alternatives: []
}, {
    image: "25.jpg",
    article: "m",
    name: "spargel",
    alternatives: []
}, {
    image: "26.jpg",
    article: "w/m",
    name: "pastinak",
    alternatives: ["pastinake"]
}, {
    image: "27.jpg",
    article: "w",
    name: "grüne bohne",
    alternatives: ["gartenbohne"]
}];

var LANG = {
    de: {
        gladToSeeYou: "Super dass du da bist, welches Spiel willst du zuerst versuchen ?",
        thanks: "Vielen Dank",
        wellDone: ["Gut !", "Sehr schön.", "Du möchtest gerne ein Kompliment hören ?", "Du bist etwas ganz Besonderes!", "Super !", "Hurra", "Bravo", "Perfekt", "So gut bist du"],
        wrong: ["Falsch !", "Falsche Antwort", "Versuchs nochmal.", "Es tut mir leid.", "Nicht richtig", "Ich bin entäuscht", "Frustrierend ! Nächstes ...", "Nächstes Mal wird es besser"],
        tooShort: "zu kurz",
        tooLong: "zu lang",
        notSerious: "Ein bisschen Mühe geben!",
        gameOver: "Spiel zu Ende !",
        tryAgain: "Willst du noch einmal ?",
        thisWasTheRightImage: "Dies war das Richtige Bild",
        "for": "für"
    } };