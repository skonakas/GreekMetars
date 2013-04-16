function parseNoaaMetarPage(xml) {
	var start = "<raw_text>";
	var indexOfStart = xml.indexOf(start);
	var indexOfEnd = xml.indexOf("</raw_text>", indexOfStart);
	return xml.substring(indexOfStart + start.length, indexOfEnd);
}