Rails.application.routes.draw do
  
  root to: 'application#index'

  # Shows how loosely couples rails is
  devise_for :users
  resources :users
  resources :trips
  resources :addresses
  
  # Extra routes
  get 'users/number/:number', :to => 'users#show_by_number'
  get 'users/name/:name', :to => 'users#show_by_name'
  get 'users/email/:email', :to => 'users#show_by_email'

end
