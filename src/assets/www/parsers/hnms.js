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

var startText = "<option value='/hnms/greek/observation/observation_html?&dr_city=";
function getAllStationsFromObservationPage(html) {
	var start = -1;
	var end = -1;
	var middle = -1;
	var results = [];
	
	while (true) {
		start = html.indexOf(startText, end);
		if (start == -1) break;
			
		middle = html.indexOf("'>", start);
		end = html.indexOf("</option>", start);

		var name = html.substring(start + startText.length, middle);
		var text = html.substring(middle + 2, end);
		
		var result = { name: name, text: text };
		results.push(result);
	}
	
	return results;
}