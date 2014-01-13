// this never changes so only check for it once
var navPos = $("#scroller-anchor").offset().top;
var navBarHeight = $(".scroller").height();
var photoHeightModifier;

function setPhoto() {
    var name = "name";
    var height = "height";
    var photos =  [ {name: "balloons.jpg", height: 1/5},
                    {name: "camp.jpg", height: 25/40},
                    {name: "deloitte-swag.jpg", height:5/32},
                    {name: "firstyear2013-01.jpg", height: 27/36},
                    {name: "firstyear2013-02.jpg", height: 1/3},
                    {name: "logo.jpg", height: 1/2},
                    {name: "luke.jpg", height: 2/3},
                    {name: "party.jpg", height: 2/5},
                    {name: "rainy-bbq.jpg", height: 1/3},
                    {name: "sand.jpg", height: 2/3},
                    {name: "seminar.jpg", height: 3/4},
                    {name: "spongebob.jpg", height: 1/2},
                    {name: "trivia.jpg", height: 3/5}
                ];
    var photo = photos[Math.floor(Math.random()*photos.length)];

    $(".photo").css("background-image", "url(/static/img/"+photo[name]+")");
    console.log(photo);
    $(".footer-photo").css("background-image", "url(/static/img/"+photo[name]+")");

    photoHeightModifier = photo[height];

}

function stickyNav(scrollTop) {
    if (scrollTop>navPos  || $(".feature").css("display") == "none") {
        $(".scroller").css("position","fixed");
        $(".scroller").css("top", "0px");
        $(".scroller").css("background-attachment", "scroll");
        $("#nav-padding").show();
    } else {
        if (scrollTop<=navPos && $(".feature").css("display") != "none") {
            $(".scroller").css("position", "relative");
            $(".scroller").css("top", "");
            $(".scroller").css("background-attachment", "fixed");
            $("#nav-padding").hide();
        }
    }
}

function titleZoom(scrollTop) {
    var fontSize;
    var bgAlpha;
    var photoPos;
    var navBarPos;

    var width = $(window).width();
    // var photoHeight = 2 * width / 3;
    var photoHeight = width * photoHeightModifier;

    if (scrollTop <= 0 && $(".feature").css("display") != "none") {
        // full header
        fontSize = 72;
        bgAlpha = 0.75;
        photoPos = (photoHeight / 2) - navPos/2;
        navBarPos = 2;
    } else if (scrollTop >= navPos || $(".feature").css("display") == "none") {
        // sticky navbar
        fontSize = 18;
        bgAlpha = 0;
        photoPos = (photoHeight / 2) - navBarHeight/2;
        navBarPos = 10;
    } else {
        // in between
        // fontSize = -54/256 * scrollTop + 72; // linear
        // y = (54/256^2)(x-256)^2 + 18 is a curve that has y-intercept 72 and is 18 at x=256 - i.e. has the desired endpoints
        fontSize = Math.pow(scrollTop-navPos, 2)/(Math.pow(navPos, 2)/54) + 18; // parabolic
        bgAlpha = -Math.pow(scrollTop, 2)/(Math.pow(navPos, 2)/0.75) + 0.75;
        photoPos = (photoHeight / 2) - (-96/navPos * scrollTop + navPos/2);
        navBarPos = 8/navPos * scrollTop + 2; // linear
    }
    
    $("#page-heading").css("font-size", fontSize.toString() + "pt");
    $("#title").css("background-color", "rgba(255,255,255,"+bgAlpha.toString()+")");
    $(".photo").css("background-position", "0 -"+photoPos.toString()+"px");
    $("#navigation").css("padding-left", navBarPos.toString() + "rem");
}

function subtitleFade(scrollTop) {
    var fadeLevel;
    var height = parseInt($("#subtitle").css("padding-top")) / 2;

    if (scrollTop <= 0 && $(".feature").css("display") != "none") {
        // full header
        fadeLevel = 1;
    } else if (scrollTop >= height || $(".feature").css("display") == "none") {
        // sticky navbar
        fadeLevel = 0;
    } else {
        // in between
        fadeLevel = -scrollTop/height + 1;
    }
    //console.log(scrollTop, height, fadeLevel);
    $("#subtitle").css("color", "rgba(0,0,0,"+fadeLevel.toString()+")");
}

setPhotoOffset = function() {
    var width = $(window).width();
    // var photoHeight = 2 * width / 3;
    var photoHeight = width * photoHeightModifier;
    var scrollTop = $(document).scrollTop();

    var offset;
    if (scrollTop <= 0 && $(".feature").css("display") != "none") {
        offset = (photoHeight / 2) - navPos/2;
    } else if (scrollTop >= navPos || $(".feature").css("display") == "none") {
        offset = (photoHeight / 2) - navBarHeight/2;
    } else {
        offset = (photoHeight / 2) - (-96/navPos * scrollTop + navPos/2);
    }
    

    //console.log(offset);

    $(".photo").css("background-position", "0 -"+offset.toString()+"px");
}

// every time scrolling happens, call the two functions
// but only check the scrolling position once
headerAnimate = function() {
    var scrollTop = $(document).scrollTop();

    if ($(window).height() < $(document).height()) {
        titleZoom(scrollTop);
        stickyNav(scrollTop);
        subtitleFade(scrollTop);
    }
};

headerSetup = function() {
    setPhoto();

    var scrollTop = $(document).scrollTop();

    titleZoom(scrollTop);
    stickyNav(scrollTop);

    setPhotoOffset();

    // Sets the max-height of the hamburger menu
    var height = $(window).height() - $("#navigation").height();

    $(".ham-menu").css("max-height", height.toString()+"px");
}

$(document).ready(headerSetup);

$(document).scroll(headerAnimate);

$(window).resize(headerAnimate);

$(window).resize(function() {
    // Sets the max-height of the hamburger menu
    var height = $(window).height() - $("#navigation").height();

    $(".ham-menu").css("max-height", height.toString()+"px");

});
