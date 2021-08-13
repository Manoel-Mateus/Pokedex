fetch("https://pokeapi.co/api/v2/pokemon/ditto").then(response => response.json()).then(allpokemon => {
	console.log(allpokemon)

	allpokemon
})