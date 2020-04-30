class GameContainerController < ApplicationController
    def initialize
        @words = {}
        File.open("./dictionary.txt") do |file|
            file.each do |line|
                @words[line.strip] = true
            end
        end
    end
    def check_word
        word = params[:word]
        
    end
end
