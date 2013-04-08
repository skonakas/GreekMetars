function parseHnmsMetarPage(airport, html) {
	var indexOfAirport = html.indexOf(airport);
	var indexOfEquals = html.indexOf("=", indexOfAirport);
	return html.substring(indexOfAirport, indexOfEquals);
}