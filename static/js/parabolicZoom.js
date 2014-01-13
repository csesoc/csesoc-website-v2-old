// parabolic functions!
var fontZoom = Math.max(100, Math.min(400, (-$(document).scrollTop()*$(document).scrollTop()/(16384/75) + 400)));
var bgAlpha = Math.max(0, Math.min(0.5, (-$(document).scrollTop()*$(document).scrollTop()/131072 + 0.5)));

if ($(document).scrollTop() < 0) {
    fontZoom = 400;
    bgAlpha = 0.5;
}