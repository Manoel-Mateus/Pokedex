window.addEventListener("load",() => {

	let cx = document.querySelector("div.pokemon-list");
	let carregando = document.getElementById("carre")
	let valorInput = document.getElementById("valor");
	let pokemons_Arr = []
	
	valorInput.onblur = function(){
		valorInput.value = ""
	}
	
	valorInput.addEventListener("keyup", async  () => {
		let quantidade = Number(valorInput.value)
		if(isNaN(quantidade) || quantidade > 300){
			alert("Digite um valor Válido");
			valorInput.value = ""
		}


		pokemons_Arr = []
		
		cx.textContent=""
		fetch(`https://pokeapi.co/api/v2/pokemon?limit=`+quantidade).then(res => res.json()).then(allpokemon => {
			allpokemon.results.forEach(cada => {
				carregando.textContent = "carregando"

				fetch(cada.url)
				.then(res => res.json())
				.then(pokemons => {
					
					pokemons_Arr.push( {nome:pokemons.name, img:pokemons.sprites.front_default} )
					
					carregando.textContent = ""
					if(pokemons_Arr.length == quantidade){
						pokemons_Arr.forEach(poke => {
							cx.innerHTML += 
							`
							<figure>
							<img class="img-pokemons" src="${poke.img}" alt="Trulli" style="width:100%">
							<figcaption>${poke.nome}</figcaption>
							</figure>
							`
						})		
					}
				})
			})		
		}).catch(() => console.warn("Erro Requisição"))
	})
})