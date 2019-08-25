const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainContainer = document.querySelector('main');

function listTrainers(json){
    //console.log(json);
    json.forEach(function(trainer){
        
       let pokemonList = trainer.pokemons.map(function(poke){
             return `<li>${poke.nickname} <button class="release" data-pokemon-id="${poke.id}">Release</button></li>`
        })

        mainContainer.innerHTML += `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>
            ${pokemonList.join("")}
            </ul>
        </div>`
    
    })
}


mainContainer.addEventListener('click', function(e){
    let trainerID = e.target.attributes[0].nodeValue;
    if(e.target.textContent === "Add Pokemon"){
        //console.log("HELLO")
        fetch(POKEMONS_URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({trainer_id: trainerID})
        })
        .then(function(res){
           // console.log(res);
            return res.json();
        })
         .then(function(data){
            //console.log(data);
             //listTrainers([data]);
             addPokemon(data)
         })
    }
})

function addPokemon(poke){
    console.log(poke)
  //  console.log(e);
    const pokeContainer = document.querySelector('.card ul');
    const pokeLi = document.createElement('li');
    pokeLi.innerHTML = `<li>${poke.nickname} <button class="release" data-pokemon-id="${poke.id}">Release</button></li>`
    pokeContainer.append(pokeLi);
 //   pokeContainer.append(`<li>${data.nickname} <button class="release" data-pokemon-id="${data.id}">Release</button></li>`)
}

function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        listTrainers(data);
    })
}

fetchTrainers()

