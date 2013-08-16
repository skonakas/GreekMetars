function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

function onDeviceReady() {
	$(document).ajaxStart(function() {
		$.mobile.loading("show");
	});

	$(document).ajaxStop(function() {
		$.mobile.loading("hide");
	});
}

function refreshAll() {
	$.ajax({
		  url: 'http://www.hnms.gr/hnms/greek/observation/observation_region_html',
		  dataType: "text"
		})
		.done(function(html) {
			var allStations = getAllStationsFromObservationPage(html);
			var allResults = $('#allResults');
			allResults.empty();

			$.each(allStations, function(i, station) {
				getLatestMetarFromHnms(station, appendMetar);
			});
		});
}

function getLatestMetar() {
	var code = $("#code").val();
	$.each(hnmsStations, function(i, station) {
		if (station.code.toLowerCase() == code.toLowerCase()) {
			getLatestMetarFromHnms(station, setMetar);
			return;
		}
	});
	
	getLatestMetarFromNoaa(code).done(function(data) {
		var metar = parseNoaaMetarPage(data); 
		if (metar.trim() != "") setMetar(metar);
		else setMetar("Not Found");
	});
}

function appendMetar(metar, station) {
	$('#allResults').append("<tr><td><strong>" + station.text + "</strong></td><td>" + metar + "</td></tr>");
}

function setMetar(metar) {
	$('#result').html(metar);
}