var gradientColorsArray = new Array(
  "#05060a",   // near-black
  "#0b0f1a",   // midnight navy
  "#111827",   // slate ink
  "#1a0b2e",   // deep purple night
  "#0d0a1f",   // cosmic indigo
  "#160b2b",   // violet abyss
  "#0a0f1e",   // ocean midnight
  "#1b1035",   // royal night
  "#050914",   // charcoal blue
  "#1f0a2b",   // magenta shadow
  "#0e0b24",   // dark sapphire
  "#120826",   // plum midnight
  "#080b1a",   // ink blue
  "#241035",   // twilight orchid
  "#0a0a12",   // graphite
  "#150a24"    // deep violet
);




var gradientTransitionStep = 0;


var gradientColorIndices = [0, 1, 2, 3];


var gradientTransitionSpeed = 0.004;

function updateGradientBackground() {
    if (typeof jQuery === 'undefined') return; 

    
    var currentLeftColorIndex = gradientColorIndices[0];
    var nextLeftColorIndex = gradientColorIndices[1];
    var currentRightColorIndex = gradientColorIndices[2];
    var nextRightColorIndex = gradientColorIndices[3];

    var currentLeftColorHex = gradientColorsArray[currentLeftColorIndex];
    var nextLeftColorHex = gradientColorsArray[nextLeftColorIndex];
    var currentRightColorHex = gradientColorsArray[currentRightColorIndex];
    var nextRightColorHex = gradientColorsArray[nextRightColorIndex];

    var inverseGradientStep = 1 - gradientTransitionStep;

    function hexToRgb(hex) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    var [rLeftStart, gLeftStart, bLeftStart] = hexToRgb(currentLeftColorHex);
    var [rLeftEnd, gLeftEnd, bLeftEnd] = hexToRgb(nextLeftColorHex);
    var [rRightStart, gRightStart, bRightStart] = hexToRgb(currentRightColorHex);
    var [rRightEnd, gRightEnd, bRightEnd] = hexToRgb(nextRightColorHex);

    var redLeft = Math.round(inverseGradientStep * rLeftStart + gradientTransitionStep * rLeftEnd);
    var greenLeft = Math.round(inverseGradientStep * gLeftStart + gradientTransitionStep * gLeftEnd);
    var blueLeft = Math.round(inverseGradientStep * bLeftStart + gradientTransitionStep * bLeftEnd);
    var leftGradientColor = "rgb(" + redLeft + "," + greenLeft + "," + blueLeft + ")";

    var redRight = Math.round(inverseGradientStep * rRightStart + gradientTransitionStep * rRightEnd);
    var greenRight = Math.round(inverseGradientStep * gRightStart + gradientTransitionStep * gRightEnd);
    var blueRight = Math.round(inverseGradientStep * bRightStart + gradientTransitionStep * bRightEnd);
    var rightGradientColor = "rgb(" + redRight + "," + greenRight + "," + blueRight + ")";

    
    $('#gradient').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + leftGradientColor + "), to(" + rightGradientColor + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + leftGradientColor + " 0%, " + rightGradientColor + " 100%)"
    });

    gradientTransitionStep += gradientTransitionSpeed;
    if (gradientTransitionStep >= 1) {
        gradientTransitionStep %= 1;
        gradientColorIndices[0] = gradientColorIndices[1];
        gradientColorIndices[2] = gradientColorIndices[3];

        gradientColorIndices[1] = (gradientColorIndices[1] + Math.floor(1 + Math.random() * (gradientColorsArray.length - 1))) % gradientColorsArray.length;
        gradientColorIndices[3] = (gradientColorIndices[3] + Math.floor(1 + Math.random() * (gradientColorsArray.length - 1))) % gradientColorsArray.length;
    }
}


setInterval(updateGradientBackground, 50); // It Means 10 milliseconds 

