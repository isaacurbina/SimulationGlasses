var blur= 0;
var increment= 5;

$(document).ready(function() {
	
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

	$('#url').focus(function () {
	    //$(this).animate({ width: "100%" }, 500);
	    if ($(document).innerWidth()<480) {
		    $("#logo").css("display", "none");
		    $("#go_btn").css("display", "inline-flex");
		}
	});

	$('#url').focusout(function () {
	    //$(this).animate({ width: "100%" }, 500);
	    if ($(document).innerWidth()<480) {
		    $("#logo").css("display", "inline-flex");
		    $("#go_btn").css("display", "none");
		} else {
			$("#go_btn").css("display", "inline-flex");
		}
	});

	$("#iframe").load(function() {
		$("#iframe").fadeIn(1000);
	});
	
	$("#iframe_container").css("top", $(".header .row").height()+"px");

	$(document).bind( 'mousewheel DOMMouseScroll', function ( e ) {
	    var e0 = e.originalEvent,
	        delta = e0.wheelDelta || -e0.detail;

	    this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
	    e.preventDefault();

	});

});