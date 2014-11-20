class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Define parameters accessible
  # No mass assignment permitted in rails 4
  # attr_accessible :email, :password, :password_confirmation, :remember_me

  # Defining user relations
  has_one :profile
  belongs_to :role
  has_many :address
  has_many :rating
  has_and_belongs_to_many :trip

  # Before createing a user
  before_create :set_default_role

  # Nested attributes
  # accepts_nested_attributes_for :profile

  private

  # Function to setup default role as CRE
  def set_default_role
  	self.role ||= Role.find_by_name('CUSTOMER')
  end

  # 
end
