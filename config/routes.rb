Rails.application.routes.draw do
  root "game_container#index"
  get "word/:word", to:"game_container#check_word"
end
