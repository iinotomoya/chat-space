Rails.application.routes.draw do
  devise_for :users
  root to: "groups#index"
  resources :users, only: [:index, :create, :new, :edit, :update, :delete]
  resources :groups, only: [:index, :create, :new, :edit, :update] do
    resources :messages, only: [:index, :create]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end