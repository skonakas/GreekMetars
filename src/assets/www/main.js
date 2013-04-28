var hnmsStations = [
                    	["LGTT", "Tatoi"],
                    	["LGMG", "Megara"],
                    ];

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

function onDeviceReady() {
}

function getLatestMetar() {
	var code = $("#code").val();
	$.each(hnmsStations, function(i, station) {
		if (station[0] == code) {
			metar = getLatestMetarFromHnms(code, station[1]);
			return;
		}
	});
	
	getLatestMetarFromNoaa(code).done(function(data) {
		setMetar(parseNoaaMetarPage(data));
	});
}

function setMetar(metar) {
	$('#result').html(metar);
}

function getLatestMetarFromHnms(code, name) {
	$.ajax({
		  url: 'http://www.hnms.gr/hnms/greek/observation/observation_html?&dr_city=' + name,
		  dataType: "text"
		}).done(function(data) {
			$.ajax({
				  url: 'http://www.hnms.gr' + parseHnmsObservationPage(data)[0],
				  dataType: "text"
				})
				.done(function(metar) {
					setMetar(parseHnmsMetarPage(code, metar));
				});
		});
}

function getLatestMetarFromNoaa(code) {
	return $.ajax({
		  url: 'http://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=3&mostRecent=true&stationString=' + code,
		  dataType: "text"
		});
}