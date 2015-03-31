describe("We are testing util.js", function() {
    
    it('basic capitalize', function() {
        expect(UTIL.capitalize("hallo")).toBe("Hallo");
        expect(UTIL.capitalize("x space")).toBe("X Space");
    });
  
    it('isDiverse', function() {
        R.forEach(function (word) {
            expect(UTIL.isDiverse(word)).toBe(false);
        }, ["oooouu", "eeeerz", "zzzzzzz"]);
        
        R.forEach(function (word) {
            expect(UTIL.isDiverse(word)).toBe(true);
        }, ["diverse", "normal", "hello poo"]);
    });
  
    it('cleanUserInput', function() {
        var c;
        R.forEach(function (userInput) {
            c = UTIL.cleanUserInput(userInput);
            expect(c.indexOf(".")).toBe(-1);
            expect(c.indexOf(",")).toBe(-1);
            expect(c.indexOf("+")).toBe(-1);
            expect(c).toBe(c.trim());
        }, ["user.input", " messy whiteSpace  ", "+answer,", "boo"]);
    });
  
    it('inputHelper', function() {
        var inputs,inputs2, f=UTIL.inputHelper;
        inputs = ["ae","ue","oe","sss","AE","UE","OE","Suessskartoffel"];
        inputs2 = ["ä","ü", "ö", "ß",  "Ä", "Ü", "Ö", "Süßkartoffel"];
        R.pipe(
            R.zip,
            R.forEach(function (pair) {
                expect(f(pair[0])).toBe(pair[1]);
            })
        )(inputs, inputs2);
    });
  
    it('random', function() {
        var r;
        R.forEach(function (i) {
            r = UTIL.random(i);
            expect(r).toBeGreaterThan(-1);
            expect(r).toBeLessThan(i);
        }, R.range(1,50));
    });
  
    it('randomSelect', function() {
        var r;
        var randomArray = R.times(UTIL.random, 15)
        R.forEach(function (i) {
            r = UTIL.randomSelect(randomArray);
            expect(randomArray).toContain(r);
        }, R.range(0,50));
    });
  
    it('randomSelectMulti', function() {
        var randomSubArray;
        var randomArray = R.times(UTIL.random, 15)
        R.forEach(function (i) {
            randomSubArray = UTIL.randomSelectMulti(randomArray, i);
            /*we only selected stuff that is in the original array*/
            R.forEach(function (r) {
                expect(randomArray).toContain(r);
            }, randomSubArray);
            /* the size of the sub array is equal to the i passed during its creation*/
            expect(randomSubArray.length).toBe(i);
            /*we could also test if the subarray didn t select twice an element of a single index*/
        }, R.range(0,15));
    });
  
    
});