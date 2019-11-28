Rails.application.routes.draw do
  devise_for :users
  root to: "messages#index"
  # root to: "users#edit"

  resources :groups,    only: [:create, :new, :edit, :update] do
    resources :messages,  only: [:index,]
  end
  resources :users,     only: [:edit, :update, :destroy]
end
