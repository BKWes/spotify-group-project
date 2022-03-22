let artistNameEl = $('#artist')



function aristSearch(event) {
	event.preventDefault();
	let artistName = artistNameEl.val();
	let artistNameSpace = artistName.replace(" ", "%20")
	fetch("https://spotify23.p.rapidapi.com/search/?q="+artistNameSpace+"&type=artists&numberOfTopResults=1", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "spotify23.p.rapidapi.com",
			"x-rapidapi-key": "14e6afb172mshd218eb3965bc14ap1190f1jsn30af3eaa08bd"
		}
	})
	.then(function(responce) {
		return responce.json();
	})
	.then(function(data) {
		let artistUri = data.artists.items[0].data.uri;
		let artistCode = artistUri.slice(15);
		console.log(artistCode);
	})
	.catch(function(err) {
		console.error(err);
	});
};

function artistAlbums(artistCode) {
	fetch("https://spotify23.p.rapidapi.com/artist_albums/?id="+artistCode+"&offset=0&limit=50", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "spotify23.p.rapidapi.com",
			"x-rapidapi-key": "50a402ad5dmsh8a86b4453bff8b5p1cd337jsn4a81dd6a5d42"
		}
	})
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		let albumArr = data.data.artist.discography.albums.items; 
		// get album array
		console.log(albumArr);
		for (var i=0; i<albumArr.length; i++) {
			console.log(albumArr[i].releases.items);
// create album card from api data
			var albumCard = document.createElement('div');
			albumCard.addClass('card');
		
			var albumArt = document.createElement('img');
			albumArt.setAttribute("src", albumArr[i].releases.items[0].coverArt.sources[0]);
			albumArt.addClass('card-img-top');
			albumCard.appendChild(albumArt);

			var albumTitle = document.createElement('h4');
			albumTitle.textContent = albumArr[i].releases.items[0].name;
			albumTitle.addClass('card-title');
			albumCard.appendChild('albumTitle');
		
			artistAlbumEl.appendChild(albumCard);

		}
	})
	.catch(function(err) {
		console.log(err);
	})
};

$("#search-form").submit(aristSearch);