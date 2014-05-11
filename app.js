$(function() {
    var glasses = $(".glasses");
    var currentAnimationListener = {
        dispose: function() {}
    };
    var currentBlurLevel= 0;

    var blurLevels = _.range(1, 6).map(function(val) {
        return "blur" + val;
    });
    var blurClasses = blurLevels.reduce(function(memo, val) {
        return memo + val + " ";
    }, "");

    $("#more_blur").click(function() {
        blurLevelUp();
    });

    $("#less_blur").click(function() {
        blurLevelDown();
    });

    $("#blur_ddm li a").click(function() {
        var newBlurLevel;
        if ($(this).html()=="Disabled")
            newBlurLevel = 0;
        else
            newBlurLevel = parseInt($(this).html().substring(6));
        console.log("New Blur Level: "+newBlurLevel);
        if (newBlurLevel>currentBlurLevel)
            blurLevelUp();
        else
            blurLevelDown();
        currentBlurLevel = newBlurLevel;
    });

    var cancelCurrentAnimation = function() {
        glasses.removeClass("animate down up");
        currentAnimationListener.dispose();
    };

    var blurLevelUp = function() {
        //if (!glasses.hasClass("up")) {
            cancelCurrentAnimation();
            setTimeout(function() {
                glasses.addClass("animate up");
                currentAnimationListener = oneListener(glasses,
                    'webkitAnimationEnd',
                    function(e) {
                        $("iframe").addClass("blur"+currentBlurLevel);
                    });
            }, 1);
        //}
    };

    var blurLevelDown = function() {
        //if (!glasses.hasClass("down")) {
            cancelCurrentAnimation();
            setTimeout(function() {
                glasses.addClass("animate down");
                currentAnimationListener = oneListener(glasses,
                    'webkitAnimationStart',
                    function(e) {
                        //if (currentBlurLevel == 0)
                            $("iframe").removeClass(blurClasses);
                        //else
                            $("iframe").addClass("blur"+currentBlurLevel);
                    });
            }, 1);
        //}
    };

    var oneListener = function($el, events, callback) {
        $el.one(events, callback);
        return {
            dispose: function() {
                $el.off(events, callback);
            }
        };
    };

});