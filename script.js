var blur= 0;
var increment= 5;

$(document).ready(function() {
	$("#btn").click(function() {
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
	        $("#btn").click();
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