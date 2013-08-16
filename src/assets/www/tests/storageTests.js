test("storage test", function() {
	var input = [
							{ name: "Agios_Efstratios", text: "Άγιος Ευστράτιος" },
							{ name: "ams_agkosmas", text: "Αγιος Κοσμάς" }
						];
	
	storage.saveFavorites(input);
	var result = storage.loadFavorites();
	ok(input == result, "storage test");
});