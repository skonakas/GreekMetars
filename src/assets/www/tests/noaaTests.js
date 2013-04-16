//http://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=3&mostRecent=true&stationString=LGAV
test("parseNoaaMetarPage test", function() {
	var input = "\n\x3C?xml version=\"1.0\" encoding=\"UTF-8\"?\x3E\n\x3Cresponse xmlns:xsd=\"http:\x2F\x2Fwww.w3.org\x2F2001\x2FXMLSchema\" xmlns:xsi=\"http:\x2F\x2Fwww.w3.org\x2F2001\x2FXML-Schema-instance\" version=\"1.2\" xsi:noNamespaceSchemaLocation=\"http:\x2F\x2Faviationweather.gov\x2Fadds\x2Fschema\x2Fmetar1_2.xsd\"\x3E\n  \x3Crequest_index\x3E8051536\x3C\x2Frequest_index\x3E\n  \x3Cdata_source name=\"metars\" \x2F\x3E\n  \x3Crequest type=\"retrieve\" \x2F\x3E\n  \x3Cerrors \x2F\x3E\n  \x3Cwarnings \x2F\x3E\n  \x3Ctime_taken_ms\x3E3\x3C\x2Ftime_taken_ms\x3E\n  \x3Cdata num_results=\"1\"\x3E\n    \x3CMETAR\x3E\n      \x3Craw_text\x3ELGAV 162020Z 01010KT 9999 FEW025 SCT080 12\x2F05 Q1019 NOSIG\x3C\x2Fraw_text\x3E\n      \x3Cstation_id\x3ELGAV\x3C\x2Fstation_id\x3E\n      \x3Cobservation_time\x3E2013-04-16T20:20:00Z\x3C\x2Fobservation_time\x3E\n      \x3Clatitude\x3E37.93\x3C\x2Flatitude\x3E\n      \x3Clongitude\x3E23.95\x3C\x2Flongitude\x3E\n      \x3Ctemp_c\x3E12.0\x3C\x2Ftemp_c\x3E\n      \x3Cdewpoint_c\x3E5.0\x3C\x2Fdewpoint_c\x3E\n      \x3Cwind_dir_degrees\x3E10\x3C\x2Fwind_dir_degrees\x3E\n      \x3Cwind_speed_kt\x3E10\x3C\x2Fwind_speed_kt\x3E\n      \x3Cvisibility_statute_mi\x3E6.21\x3C\x2Fvisibility_statute_mi\x3E\n      \x3Caltim_in_hg\x3E30.088583\x3C\x2Faltim_in_hg\x3E\n      \x3Cquality_control_flags\x3E\n        \x3Cno_signal\x3ETRUE\x3C\x2Fno_signal\x3E\n      \x3C\x2Fquality_control_flags\x3E\n      \x3Csky_condition sky_cover=\"FEW\" cloud_base_ft_agl=\"2500\" \x2F\x3E\n      \x3Csky_condition sky_cover=\"SCT\" cloud_base_ft_agl=\"8000\" \x2F\x3E\n      \x3Cflight_category\x3EVFR\x3C\x2Fflight_category\x3E\n      \x3Cmetar_type\x3EMETAR\x3C\x2Fmetar_type\x3E\n      \x3Celevation_m\x3E94.0\x3C\x2Felevation_m\x3E\n    \x3C\x2FMETAR\x3E\n  \x3C\x2Fdata\x3E\n\x3C\x2Fresponse\x3E\n";
	var expectedResult = "LGAV 162020Z 01010KT 9999 FEW025 SCT080 12/05 Q1019 NOSIG";
	var result = parseNoaaMetarPage(input);
	ok(expectedResult == result, "parseNoaaMetarPage test");
});