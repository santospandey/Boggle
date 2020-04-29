Rails.application.routes.draw do
  root "game_container#index"
  get "random_characters", to:"game_container#get_random_characters"
end
