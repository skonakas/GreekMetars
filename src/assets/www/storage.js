var storage = {
	saveFavorites: function() {
		window.localStorage.setItem("favorites", JSON.stringify(favorites));
	},
	loadFavorites: function() {
		var favoritesStorage = window.localStorage.getItem("favorites");
		if (favoritesStorage != null) favorites = JSON.parse(favoritesStorage);
	}
};