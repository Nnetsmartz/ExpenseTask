class AccountsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid do |error|
        account = error.record
        render json: account.errors, status: :bad_request
    end
  
    def index
        render json: Account.order(date: :desc)
    end
  
    def show
        account = Account.find(params[:id])
        render json: account
    end
  
    def create
        account = Account.create!(account_params)
        render json: account
    end
  
    def update
        account = Account.find(params[:id])
        account.update!(account_params)
        render json: account
    end
  
    def destroy
        account = Account.find(params[:id])
        account.destroy
    end
  
    private
  
    def account_params
      params.permit(:name, :number, :balance)
    end
  end