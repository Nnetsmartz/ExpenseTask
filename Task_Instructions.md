Please do not fork the repository, but instead just clone it from Github. Once done, feel free to email the code to me or upload it to a publicly accessible Git repository and provide me with the link.

## The task

You're provided with a very simplified application for expense tracking. The main layout and the Expense CRUD functionality has already been implemented. For simplicity, expense amounts can only be in full dollar amounts (cents are not supported).

### Task 1
Your task is to add an "Account" resource to the application. The user needs to be able to add, or delete as many accounts as they like. They also need to be able to edit their name and account number. The account balance cannot be changed by the user.

The "Account" functionality should function as follows:

The "Account" represents a bank account, and must have the following properties: 
 - Name (user-friendly account name), 
 - Number (bank account number), 
 - Balance
 - Newly created accounts have a starting balance of $1,000 and cannot be changed by the frontend.

Every expense must be assigned to an account. After creating, an expense can be reassigned to a different account. Assigning expenses to an account should adjust the account balance accordingly.

Users should not be able to spend more money than what is available on the account, i.e the balance cannot be negative. 

### Task 2

The frontend React application gracefully handles situations where the server is unreachable or returns an unexpected response. If a save/delete request fails,  a toast-like notification will be shown. Please improve the Notifications implementation on the frontend so notifications disappear automatically after 5 seconds.

Please approach this project as if it was an actual application that needs to be deployed to production. Feel free to refactor any of the existing code and/or extract and create additional specific or general-purpose frontend components to implement the required functionality.
