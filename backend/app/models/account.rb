class Account < ApplicationRecord
    has_many :expenses, dependent: :destroy
    validates :name, :number, presence: true
    validates :balance
    validates :number, uniqueness: true
end
