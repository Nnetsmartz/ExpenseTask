class Expense < ApplicationRecord
  belongs_to :account
  validates :amount, :date, :description, presence: true
  validates :amount, numericality: { greater_than: 0, only_integer: true }
end
