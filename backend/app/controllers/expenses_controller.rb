class ExpensesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid do |error|
    expense = error.record
    render json: expense.errors, status: :bad_request
  end

  def index
    render json: Expense.order(date: :desc)
  end

  def show
    expense = Expense.find(params[:id])
    render json: expense
  end

  def create
    expense = Expense.new(expense_params)
    updated_balance = expense.account.balance - expense.amount

    if(updated_balance >= 0) 
      expense.save
      expense.account.update(balance: updated_balance)
      render json: expense
    else
      render :json => {status: 400, message: 'Insufficient Balance'}, status: :bad_request
    end
  end

  def update
    expense = Expense.find(params[:id])
    expense.update!(expense_params)
    render json: expense
  end

  def destroy
    expense = Expense.find(params[:id])
    expense.destroy
  end

  private

  def expense_params
    params.permit(:amount, :date, :description, :account_id)
  end
end