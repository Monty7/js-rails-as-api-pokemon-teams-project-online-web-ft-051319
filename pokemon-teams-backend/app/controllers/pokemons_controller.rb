class PokemonsController < ApplicationController
   def index
    pokemons = Pokemon.all 
    render json: pokemons, include: [:trainer]
   end

   def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: { id: pokemon.id, nickname: pokemon.nickname, species: pokemon.species, trainer: pokemon.trainer }
   end

   def create
   # byebug
    
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    trainer = Trainer.find_by(id: params[:trainer_id])
    if (trainer.pokemons.count < 6)
      new_pokemon = trainer.pokemons.create(nickname: name, species: species)
   
   # Pokemon.create(nickname: name, species: species, trainer_id: params[trainer_id])
   render json: new_pokemon
    else
      #binding.pry
   render json: {err_message: "Too Many Pokemons for this team"}
    end
   end

   def destroy
  #  binding.pry
   Pokemon.find_by(id: params[:id]).destroy

   end
end
