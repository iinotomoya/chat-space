Rails.application.routes.draw do
  devise_for :users
  root to: "groups#index"

  resources :groups, only: [:index, :create, :new, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  resources :users, only: [:index, :create, :new, :edit, :update, :delete]

  namespace :api do
    resources :messages, only: :index, defaults: { format: 'json' }
  end
end
