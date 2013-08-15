var hnmsStations = [
                    	{ code: "LGTT", name: "Tatoi" },
                    	{ code: "LGMG", name: "Megara" }
                    ];

function parseHnmsMetarPage(html) {
	var indexOfAirport = html.indexOf('LG');
	var indexOfEquals = html.indexOf("=", indexOfAirport);
	return html.substring(indexOfAirport, indexOfEquals);
}

function getLatestMetarFromHnms(station, func) {
	return $.ajax({
		  url: 'http://www.hnms.gr/hnms/greek/observation/observation_html?&dr_city=' + station.name,
		  dataType: "text"
		}).done(function(data) {
			$.ajax({
				  url: 'http://www.hnms.gr' + parseHnmsObservationPage(data)[0],
				  dataType: "text"
				}).done(function(metar) {
					func(parseHnmsMetarPage(metar), station);
				});
		});
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