var favorites = [
						{ name: "Megara", text: "Μέγαρα" },
						{ name: "Tanagra", text: "Τανάγρα" },
						{ name: "Tatoi", text: "Τατόι" }
                  ];

var editMode = false;

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
			refresh(allStations, allResults, appendMetarToAll);
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

function appendMetar(metar, station, control) {
	control.append("<li><h3>" + station.text + "</h3><p style='white-space: normal'>" + metar + "</p></li>");
	
	control.listview("refresh");
}

function appendMetarToAll(metar, station) {
	appendMetar(metar, station, $('#allResults'));
}

function appendMetarToFavorites(metar, station) {
	appendMetar(metar, station, $('#favoritesResults'));
}

function changeMode(edit) {
	editMode = edit;
	
	if (editMode) {
		$('#startEditDiv').hide();
		$('#stopEditDiv').show();
	} else {
		$('#startEditDiv').show();
		$('#stopEditDiv').hide();
		
	}
}