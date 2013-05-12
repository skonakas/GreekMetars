function parseHnmsMetarPage(airport, html) {
	var indexOfAirport = html.toLowerCase().indexOf(airport.toLowerCase());
	var indexOfEquals = html.indexOf("=", indexOfAirport);
	return html.substring(indexOfAirport, indexOfEquals);
}

function parseHnmsObservationPage(html) {
	var start = -1;
	var end = -1;
	var result = [];
	
	while (true) {
		start = html.indexOf("/hnms/greek/encodedinfo_popup_html?db_station=", end);
		
		if (start == -1) break;
			
		end = html.indexOf("'", start);
		result.push(html.substring(start, end));
	}
	
	return result;
}