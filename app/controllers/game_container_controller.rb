class GameContainerController < ApplicationController
    
    @@words = {}
    
    def initialize_dict 
        if @@words.empty?            
            path =  File.join(Rails.root, "app", "assets", "dictionary.txt")
            File.open(path) do |file|
                file.each do |line|
                    @@words[line.strip] = true
                end
            end
        end
    end
    def check_word        
        initialize_dict
        word = params[:word].upcase
        render json:{isTrue: @@words[word]}
    end
end
