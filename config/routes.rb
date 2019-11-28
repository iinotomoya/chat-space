Rails.application.routes.draw do
  devise_for :users
  root to: "messages#index"
  # root to: "users#edit"

  resources :messages,  only: [:index]
  resources :users,     only: [:edit, :update, :destroy]

end
