Rails.application.routes.draw do
  root "game_container#index"
  get "rest/v1/word/:word", to:"game_container#check_word"
end
