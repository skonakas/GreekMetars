var favorites = [
						{ name: "Megara", text: "Μέγαρα" },
						{ name: "Tanagra", text: "Τανάγρα" },
						{ name: "Tatoi", text: "Τατόι" }
                  ];


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
			refresh(allStations, allResults, appendMetar);
		});
}

function refreshFavorites() {
	$("#favoritesResults").sortable();
	refresh(favorites, $('#favoritesResults'), appendMetarToFavorites);
}

function refresh(stations, placeholder, func) {
	placeholder.empty();

	$.each(stations, function(i, station) {
		getLatestMetarFromHnms(station, func);
	});
}

function appendMetar(metar, station) {
	$('#allResults').append("<tr><td><strong>" + station.text + "</strong></td><td>" + metar + "</td></tr>");
}

function appendMetarToFavorites(metar, station) {
	$('#favoritesResults').append("<tr><td><strong>" + station.text + "</strong></td><td>" + metar + "</td></tr>");
}