var favorites = [];
var allStations = [];
var allStationsLoaded = false;
var allStationsLoadingEvent;
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
	
	setup();
}

function setup() {
	storage.loadFavorites();
	
	allStationsLoadingEvent = $.ajax({
		  url: 'http://www.hnms.gr/hnms/greek/observation/observation_region_html',
		  dataType: "text"
		})
		.done(function(html) {
			allStations = getAllStationsFromObservationPage(html);
			allStationsLoaded = true;
		});
	
	$(document).on( "pageinit", "#all", function(event) {
		if (allStationsLoaded) {
			fillAllResults();
		} else {
			allStationsLoadingEvent.done(function() {
				fillAllResults();
			});
		}
	});
	
	allStationsLoadingEvent.done(function() {
		fillSelectNewStation();
	});
	
	$("#favoritesResults").sortable();
	showFavoriteStations();
}

function fillSelectNewStation() {
	var selectNewStation = $("#selectNewStation");
	
	$.each(allStations, function(i, station) {
		selectNewStation.append("<option value='" + station.name + "|" + station.text + "'>" + station.text + "</option>");
	});

	selectNewStation.selectmenu("refresh");
}

function fillAllResults() {
	var allResults = $('#allResults');
	
	$.each(allStations, function(i, station) {
		appendStationText(station, allResults);
	});
}

function refreshAll() {
	var allResults = $('#allResults');
	refresh(allStations, allResults, appendMetarToAll);
}

function refreshFavorites() {
	if (editMode) return;
	
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
			metarText + "</a><a href='#' onclick='removeFromFavorites(\"" + station.name + "\")' class='deleteFromList' style='display: none'></a></li>");
	
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

function removeFromFavorites(stationName) {
	var position = -1;
	$.each(favorites, function(i, station) {
		if (station.name == stationName) {
			position = i;
			return false;
		}
	});
	
	if (position > -1) {
		favorites.splice(position, 1);
		storage.saveFavorites();

		showFavoriteStations();
	}
}

function addStation() {
	var values = $('#selectNewStation').val().split("|");
	if (values.length != 2) return;
	
	favorites.push({ name: values[0], text: values[1] });
	storage.saveFavorites();

	showFavoriteStations();
}