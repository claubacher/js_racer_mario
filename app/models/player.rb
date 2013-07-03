class Player < ActiveRecord::Base
  validates :name, :presence => true, :uniqueness => true
  validates :icon, :presence => true

  has_many :rounds
  has_many :matches, :through => :rounds
  has_one :icon
end
