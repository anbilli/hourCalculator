
// Input: "hh:mm", string
// Output: minutes, int
function convertToMins(time) {
	var hours = parseInt(time.slice(0, time.indexOf(":")));
	var minutes = parseInt(time.slice(time.indexOf(":") + 1));
	return (60 * hours + minutes);
}

// Input: minutes, int
// Output: "hh:mm", string
function convertToHours(time) {
	var hour = (Math.floor(time / 60)).toString();
	var min = (time % 60).toString();
	min = ("0" + min).slice(-2);
	return (hour + ":" + min.toString());
}

// set body height = window height
function set_body_height() { 
	$('body').height($(window).height());
}

// Resize 
$(document).ready(function() {
	$(window).bind('resize', set_body_height);
		set_body_height();
});

// Fade out and in of current and new slides
$("#next_button").click(function() {
	$("#slide1").fadeOut( function() {
		$("#slide2").fadeIn();	
	});
});

// Submit final form
$("#submit_button").click(function() {
	$("#slide2").fadeOut( function() {
		$("#slide3").fadeIn();
	});
	
	var hoursGoal = document.getElementById("hours_wanted").value;
	var minutesGoal = document.getElementById("minutes_wanted").value;
	var startTime = document.getElementById("start_time").value;
	var lunchStart = document.getElementById("lunch_start").value;
	var lunchEnd = document.getElementById("lunch_end").value;
	
	// Validate input
	if (isInt(hoursGoal) && isInt(minutesGoal)) {
		hoursGoal = checkEmpty(hoursGoal);
		minutesGoal = checkEmpty(minutesGoal);
		
		hoursGoal = parseInt(hoursGoal);
		minutesGoal = parseInt(minutesGoal);
	}
	else {
		window.alert(hoursGoal + " " + minutesGoal);
	}
	
	// Parse times
	startTime = convertToMins(startTime);
	lunchStart = convertToMins(lunchStart);
	lunchEnd = convertToMins(lunchEnd);
	
	var endTime = startTime + (hoursGoal * 60 + minutesGoal) + (lunchEnd - lunchStart);
	
	document.getElementById("slide3").innerHTML = "<label> You should clock out at " + convertToHours(endTime) + "</label>";
});

$(function() {
	$("#slide1").fadeIn();
});

$(".page_header").click(function() {
	$("#slide3").fadeOut( function() {
		location.reload();
	});
});

function isInt(str) {
	if (str == "") {
		return true;
	}
	var n = Math.floor(Number(str));
	return (String(n) === str && n >= 0);
}

function checkEmpty(str) {
	if(str == "") {
		return "0";
	}
	else {
		return str;
	}
}


