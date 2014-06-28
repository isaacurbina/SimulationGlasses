var blur= 0;
var increment= 5;

$(document).ready(function() {

	if (getURLParameters("q")!=null) {
		var url= getURLParameters("q");
	}
	
	$("#go_btn").click(function() {
		var url= $("#url").val();
		changeIframeURL(url);
		console.log("changing to "+url);
	});

	$("#go_btn_lp").click(function() {
		var url= $("#url_lp").val();
		changeIframeURL(url);
		console.log("forwarding to viewer with url "+url);
		document.location.href= "viewer.html?q="+encodeURIComponent(url);
	});

	$("#url").keyup(function (e) {
	    if (e.keyCode == 13) {
	        $("#go_btn").click();
	    }
	});

	$("#url_lp").keyup(function (e) {
	    if (e.keyCode == 13) {
	        $("#go_btn_lp").click();
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

function getURLParameters(paramName) 
{
        var sURL = window.document.URL.toString();  
    if (sURL.indexOf("?") > 0)
    {
       var arrParams = sURL.split("?");         
       var arrURLParams = arrParams[1].split("&");      
       var arrParamNames = new Array(arrURLParams.length);
       var arrParamValues = new Array(arrURLParams.length);     
       var i = 0;
       for (i=0;i<arrURLParams.length;i++)
       {
        var sParam =  arrURLParams[i].split("=");
        arrParamNames[i] = sParam[0];
        if (sParam[1] != "")
            arrParamValues[i] = unescape(sParam[1]);
        else
            arrParamValues[i] = "No Value";
       }

       for (i=0;i<arrURLParams.length;i++)
       {
                if(arrParamNames[i] == paramName){
            //alert("Param:"+arrParamValues[i]);
                return arrParamValues[i];
             }
       }
       return null;
    }

}

function changeIframeURL(url) {
	if (url.indexOf("http://") <= -1) {
    	url= "http://"+url;
    	$("#url").val(url);
    }
    $("#iframe").fadeOut(1000);
	$("#iframe").attr("src", url).delay(1000);
}