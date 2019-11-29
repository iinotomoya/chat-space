Rails.application.routes.draw do
  devise_for :users
  root to: "groups#index"

  resources :groups,    only: [:index, :create, :new, :edit, :update] do
    resources :messages,  only: [:index,]
  end
  resources :users,     only: [:edit, :update, :destroy]
end
