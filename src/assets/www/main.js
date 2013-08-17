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
	
	setupFavorites();
}

function setupFavorites() {
	$.ajax({
		  url: 'http://www.hnms.gr/hnms/greek/observation/observation_region_html',
		  dataType: "text"
		})
		.done(function(html) {
			var allStations = getAllStationsFromObservationPage(html);
			var selectNewStation = $("#selectNewStation");
			
			$.each(allStations, function(i, station) {
				selectNewStation.append("<option value=" + station.name + ">" + station.text + "</option>");
			});
			selectNewStation.selectmenu("refresh");
		});
	
	$("#favoritesResults").sortable();
	showFavoriteStations();
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
	refresh(favorites, $('#favoritesResults'), appendMetarToFavorites);
}

function showFavoriteStations() {
	var control = $('#favoritesResults');
	control.empty();

	$.each(favorites, function(i, station) {
		appendStationText(station, control);
	});
}

function refresh(stations, placeholder, func) {
	placeholder.empty();

	$.each(stations, function(i, station) {
		getLatestMetarFromHnms(station, func);
	});
}

function appendMetar(metar, station, control) {
	var metarText = metar != null ? "<p style='white-space: normal'>" + metar + "</p>" : "";
	control.append("<li data-icon='delete'><a href='#'><h3>" + station.text + "</h3>" + 
			metarText + "</a><a href='#' onclick='alert(\"a\")' class='deleteFromList' style='display: none'></a></li>");
	
	control.listview("refresh");
}

function appendStationText(station, control) {
	appendMetar(null, station, control);
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
		$('.deleteFromList').show();
		$('#addDiv').show();
	} else {
		$('#startEditDiv').show();
		$('#stopEditDiv').hide();
		$('.deleteFromList').hide();
		$('#addDiv').hide();
	}
}