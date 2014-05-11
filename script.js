var blur= 0;
var increment= 3;

$(document).ready(function() {

	$("#more_blur").click(function() {
		blur+= increment;
		var blur_value= "blur("+blur+"px)";
		console.log(blur+"   "+blur_value);
		apply_blur(blur_value);
		animate_glasses();
	});
	$("#less_blur").click(function() {
		if (blur>0)
			blur-= increment;
		var blur_value= "blur("+blur+"px)";
		console.log(blur+"   "+blur_value);
		apply_blur(blur_value);
		animate_glasses();
	});
	$("#go_btn").click(function() {
		var url= $("#url").val();
		if (url.indexOf("http://") <= -1) {
	    	url= "http://"+url;
	    	$("#url").val(url);
	    }
	    $("#iframe").fadeOut(1000);
		$("#iframe").attr("src", url).delay(1000);
		console.log("changing to "+url);
	});
	$("#url").keyup(function (e) {
	    if (e.keyCode == 13) {
	        $("#go_btn").click();
	    }
	});
	$("#drag").click(function() {
		$("#scroll_menu").slideUp(500);
		if ($("#scroll_menu").is(":visible")) {
			$("#scroll_menu").slideUp(500);
		} else {
			$("#scroll_menu").slideDown(500);
			$("#url").focus();
		}
	});
	$("#drag").hover(function() {
		if (!$("#scroll_menu").is(":visible")) {
			$("#scroll_menu").slideDown(500);
			$("#url").focus();
		}
	});
	$("#menu").mouseleave(function() {
		if ($("#scroll_menu").is(":visible")) {
			$("#scroll_menu").slideUp(500);
		}
	});
	$("#iframe").load(function() {
		$("#iframe").fadeIn(1000);
	});

	$("#scroll_menu").delay(3000).slideDown(500);
	animate_glasses();

});

function apply_blur(blur_value) {
	$("#iframe_container").css({
						   'filter'         : blur_value,
						   '-webkit-filter' : blur_value,
						   '-moz-filter'    : blur_value,
						   '-o-filter'      : blur_value,
						   '-ms-filter'     : blur_value
						});
}

function animate_glasses() {
	$(".glasses").toggleClass("down");
	//$(".glasses").toggleClass("up");
	setTimeout(function() {
		console.log("step 1");
		//$(".glasses").removeClass("start");
		//$(".glasses").addClass("ready");
		setTimeout(function() {
		    /*$(".glasses").removeClass('ready');
		    console.log("step 2");
		    setTimeout(function() {
			    $(".glasses").removeClass('ready');
			    $(".glasses").addClass('end');
			    console.log("step 3");
			}, 3000);*/
		}, 3000);
	}, 3000);
	//$(".glasses").delay(5000).toggleClass("down");
	//console.log("step 3");
}