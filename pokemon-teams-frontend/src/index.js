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
  //  
    if(e.target.textContent === "Add Pokemon"){
        console.log(trainerID)
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
        //     //console.log(data);
        //      //listTrainers([data]);
            if (data.err_message){
                alert(data.err_message)
            } else {
              addPokemon(data, trainerID)
          }
        })
    }
    if(e.target.textContent === "Release"){
        let pokeID = e.target.attributes[1].nodeValue;
        fetch(`${POKEMONS_URL}/${pokeID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({id: pokeID})
        })
            .then(function(){
                removePoke(e)             
            })

    }
})

function relaseBtn(attr){
    const liBtn = document.createElement('button'); 
    liBtn.setAttribute("data-pokemon-id", attr);
    liBtn.setAttribute("class", "release");
    liBtn.innerText = "Release";
    return liBtn;
}

function removePoke(e){
    let li = e.target.parentNode;
    let ul = li.parentNode;

    ul.removeChild(li);
}

function addPokemon(poke, trainerID){
    
   // console.log(trainerID);
    const pokeContainer = document.querySelector(`div[data-id='${trainerID}'] ul`);
    const pokeLi = document.createElement('li');
    pokeLi.innerText = `${poke.nickname}`;
     pokeLi.append(relaseBtn(trainerID));
    pokeContainer.append(pokeLi);
   
   // const pokeLi = pokeLi.innerHTML = `<li>${poke.nickname} <button class="release" data-pokemon-id="${poke.id}">Release</button></li>`
  
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

