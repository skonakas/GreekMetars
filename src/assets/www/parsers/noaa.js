function parseNoaaMetarPage(xml) {
	var start = "<raw_text>";
	var indexOfStart = xml.indexOf(start);
	var indexOfEnd = xml.indexOf("</raw_text>", indexOfStart);
	return xml.substring(indexOfStart + start.length, indexOfEnd);
}

function getLatestMetarFromNoaa(code) {
	return $.ajax({
		  url: 'http://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=3&mostRecent=true&stationString=' + code,
		  dataType: "text"
		});
}