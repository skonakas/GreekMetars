var storage = {
	saveFavorites: function(favorites) {
		window.localStorage.setItem("favorites", favorites);
	},
	loadFavorites: function() {
		return window.localStorage.getItem("favorites");		
	}
};