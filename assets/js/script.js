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

$("#search-form").submit(aristSearch);