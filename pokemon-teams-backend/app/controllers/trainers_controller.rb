class TrainersController < ApplicationController
    def index
        trainers = Trainer.all 
        render json: trainers, include: [:pokemons]
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        render json: {id: trainer.id, name: trainer.name, pokemons: trainer.pokemons}
    end
end
