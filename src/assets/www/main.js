function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

function onDeviceReady() {
}

function getLatestMetar() {
	getLatestMetarFromNoaa();
}

function getLatestMetarFromHnms() {
	var result = parseHnmsMetarPage("LGTT", input);
}

function getLatestMetarFromNoaa() {
	$.get('http://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=3&mostRecent=true&stationString=LGAV', function(data) {
		var result = parseNoaaMetarPage(data);
		$('#result').html(result);
		}, "text");
}