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
            changeBarsLevel();
        }
    };

    var blurLevelDown = function() {
        console.log("blurLevelDown");
        if (currentBlurLevel>0) {
            currentBlurLevel--;
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
            changeBarsLevel();
        }
    };

    var oneListener = function($el, events, callback) {
        $el.one(events, callback);
        return {
            dispose: function() {
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

});