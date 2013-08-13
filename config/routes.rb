Annotate::Application.routes.draw do
  resources :annotations

  get "home/index"

  root to: 'home#index'
end
