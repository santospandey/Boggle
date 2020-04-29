class GameContainerController < ApplicationController

    def get_random_characters        
        max_character = 4  # Set Default character  
        puts request.query_parameters.max       
        if request.query_parameters[:max]
            max_character = (request.query_parameters[:max]).to_i
        end                
        @characters = (0...max_character).map {(0...max_character).map {(65 + rand(26)).chr}.join }
        render json:{board: @characters}
    end

end
