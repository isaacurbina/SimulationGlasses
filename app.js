var glasses;
var currentAnimationListener;
var currentBlurLevel;
var blurLevels;
var blurClasses;
$(function() {

    glasses = $("#glasses");
    currentAnimationListener = {
        dispose: function() {}
    };
    currentBlurLevel= 0;

    blurLevels = _.range(1, 6).map(function(val) {
        return "blur" + val;
    });
    blurClasses = blurLevels.reduce(function(memo, val) {
        return memo + val + " ";
    }, "");

    $("#iframe").css("min-height", $(window).height()+"px");

    $("#more_blur").click(function() {
        console.log("#more_blur.click()");
        blurLevelUp();
    });

    $("#less_blur").click(function() {
        console.log("#less_blur.click()");
        blurLevelDown();
    });

    var cancelCurrentAnimation = function() {
        console.log("cancelCurrentAnimation");
        glasses.removeClass("animate down up");
        currentAnimationListener.dispose();
    };

    var blurLevelUp = function() {
        console.log("blurLevelUp");
        if (currentBlurLevel<3) {
            currentBlurLevel++;
            //$("#iframe").removeClass(blurClasses);
        //if (!glasses.hasClass("up")) {
            cancelCurrentAnimation();
            setTimeout(function() {
                console.log("setTimeout blurLevelUp");
                glasses.addClass("animate up");
                currentAnimationListener = oneListener(glasses,
                    'webkitAnimationEnd',
                    function(e) {
                        console.log("adding blur"+currentBlurLevel);
                        $("#iframe").addClass("blur"+currentBlurLevel);
                    });
                currentAnimationListener = oneListener(glasses,
                    'animationend',
                    function(e) {
                        console.log("adding blur"+currentBlurLevel);
                        $("#iframe").addClass("blur"+currentBlurLevel);
                    });
            }, 1);
        //}
            changeBarsLevel();
        }
    };

    var blurLevelDown = function() {
        //$("#iframe").removeClass(blurClasses);
        console.log("blurLevelDown");
        if (currentBlurLevel>0) {
            currentBlurLevel--;
        //if (!glasses.hasClass("down")) {
            cancelCurrentAnimation();
            setTimeout(function() {
                console.log("setTimeout blurLevelDown");
                glasses.addClass("animate down");
                currentAnimationListener = oneListener(glasses,
                    'webkitAnimationStart',
                    function(e) {
                            console.log("removing blur classes");
                            $("#iframe").removeClass(blurClasses);
                            $("#iframe").addClass("blur"+currentBlurLevel);
                    });
                currentAnimationListener = oneListener(glasses,
                    'animationstart',
                    function(e) {
                            console.log("removing blur classes");
                            $("#iframe").removeClass(blurClasses);
                            $("#iframe").addClass("blur"+currentBlurLevel);
                    });
            }, 1);
        //}
            changeBarsLevel();
        }
    };

    var oneListener = function($el, events, callback) {
        console.log("oneListener");
        $el.one(events, callback);
        console.log("return dispose");
        return {
            dispose: function() {
                console.log("return oneListener");
                $el.off(events, callback);
            }
        };
    };

    var changeBarsLevel= function() {
        console.log(currentBlurLevel);
        for (var i=1; i<4; i++) {
            if (i<=currentBlurLevel)
                $("#blur_bars").children().eq(i-1).addClass("selected");
            else
                $("#blur_bars").children().eq(i-1).removeClass("selected");
        }
    }

    /*$(window).bind('mousewheel', function(event) {
        if (event.originalEvent.wheelDelta >= 0) {
            console.log('Scroll up');
        }
        else {
            console.log('Scroll down');
        }
        console.log("scrollTop: "+$(window).scrollTop());
        console.log(isScrolledIntoView($))
    });*/

});

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

var pfx = ["webkit", "moz", "MS", "o", ""];
function PrefixedEvent(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p]+type, callback, false);
    }
}