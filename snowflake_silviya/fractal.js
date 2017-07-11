var iteration = 0;
 
function next_iteration(step) {
    var iterationCounter = document.getElementById("iterationCounter");
    iteration = iteration + step < 0 ? 0 : iteration + step ;
    iterationCounter.innerHTML = iteration;
    init(iteration);
}

var init = (function(){

    var W = 550; 
    var H = 510;
    var timeout = 100;
    var strokeColor = "#ce534d";
    var bgColor = "#ded4b9";
    var canvas;

    return function(iteration){
    	canvas = document.getElementById("imageView");
    	 
        context = canvas.getContext('2d');
        context.beginPath();
        context.stroke();
        context.closePath();
        
    	context.clearRect(0, 0, W, H);
    	
        kochCurve({x: 50,  y: 150}, {x: 500, y: 150}, iteration);
        kochCurve({x: 500, y: 150}, {x: 270, y: 490}, iteration);
        kochCurve({x: 270, y: 490}, {x: 50,  y: 150}, iteration);
    };

    function kochCurve(A, B, iteration){

        if (iteration < 0){
            return null;
        }

        var C = divide(add(multiply(A, 2), B), 3);
        var D = divide(add(multiply(B, 2), A), 3);
        var M = divide(add(A, B), 2);
        
        var E = divide(minus(M, A), length(M, A));
        var N = normala(E);

        var F = add(multiply(N, Math.sqrt(3)/6 * length(B, A)), M);

        setTimeout(function(){
            line(A, B, strokeColor);

            if (iteration !=0){
                setTimeout(function(){
                    for (var i = 0; i < 7; i++)
                        line(C, D, bgColor);
                }, timeout);
            };
        
            kochCurve(A, C, iteration-1);
            kochCurve(C, F, iteration-1);
            kochCurve(F, D, iteration-1);
            kochCurve(D, B, iteration-1);

        },timeout);
    };

    function normala(v) {
        return { x: v.y, y: -v.x }
    }

    function multiply(v, num) {
        return { x: v.x * num, y: v.y * num};
    };

    function divide(v, num) {
        return { x: v.x/num, y: v.y / num };
    };
     
    function add(a, b) {
        return { x: a.x + b.x, y: a.y + b.y };
    };

    function minus(a, b) {
        return {
            x: a.x - b.x, y: a.y - b.y };
    };

    function length(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + 
                         Math.pow(a.y - b.y, 2));
    };

    function line(a, b, c) {
        context.beginPath();
        context.strokeStyle = c;
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
        context.closePath();
    };
})();
